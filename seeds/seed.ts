import { ValidatedComponent } from '@/shared/schemas/componentSchema/componentSchema';
import * as components from './components';
import { consola } from 'consola';

interface ComponentDefinition {
  name: string;
  component: ValidatedComponent;
}

interface ApiComponent {
  id: string;
  name: string;
}

interface ApiError {
  message?: string;
  error?: string;
}

type SeedCommand = 'create' | 'update' | 'delete';

// ============================================================================
// CONFIGURATION
// ============================================================================

class Config {
  static readonly API_URL = process.env.API_URL ?? 'http://localhost:3000/api/components';

  static readonly COMPONENTS: ComponentDefinition[] = [
    { name: 'custom-header', component: components.customHeader },
  ];

  static readonly COMMANDS: Record<SeedCommand, string> = {
    create: 'create',
    update: 'update',
    delete: 'delete',
  } as const;
}

// ============================================================================
// CUSTOM ERRORS
// ============================================================================

class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly endpoint?: string,
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

class InvalidCommandError extends Error {
  constructor(command: string) {
    super(`Invalid command: "${command}". Use: create, update, or delete`);
    this.name = 'InvalidCommandError';
  }
}

// ============================================================================
// API CLIENT
// ============================================================================

class ComponentApiClient {
  constructor(private readonly baseUrl: string) {}

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const errorData = await this.parseErrorResponse(response);
        throw new ApiRequestError(
          errorData.message || `Request failed with status ${response.status}`,
          response.status,
          endpoint,
        );
      }

      return await this.parseSuccessResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiRequestError) {
        throw error;
      }
      throw new ApiRequestError(
        `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        undefined,
        endpoint,
      );
    }
  }

  private async parseErrorResponse(response: Response): Promise<ApiError> {
    try {
      return await response.json();
    } catch {
      return { message: response.statusText };
    }
  }

  private async parseSuccessResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      return await response.json();
    }

    return null as T;
  }

  async create(name: string, component: ValidatedComponent): Promise<void> {
    await this.request('', {
      method: 'POST',
      body: JSON.stringify({ name, component }),
    });
  }

  async update(name: string, component: ValidatedComponent): Promise<void> {
    await this.request(`/${name}`, {
      method: 'PUT',
      body: JSON.stringify({ component }),
    });
  }

  async delete(id: string): Promise<void> {
    await this.request(`/${id}`, {
      method: 'DELETE',
    });
  }

  async getAll(): Promise<ApiComponent[]> {
    return this.request<ApiComponent[]>('');
  }
}

// ============================================================================
// SEED SERVICE
// ============================================================================

class ComponentSeedService {
  constructor(
    private readonly apiClient: ComponentApiClient,
    private readonly components: ComponentDefinition[],
  ) {}

  async seedAll(): Promise<void> {
    consola.start('Seeding components...');

    for (const { name, component } of this.components) {
      await this.seedOne(name, component);
    }

    consola.success(`✓ Seeded ${this.components.length} component(s)`);
  }

  async updateAll(): Promise<void> {
    consola.start('Updating components...');

    for (const { name, component } of this.components) {
      await this.updateOne(name, component);
    }

    consola.success(`✓ Updated ${this.components.length} component(s)`);
  }

  async deleteAll(): Promise<void> {
    consola.start('Deleting all components...');

    const existingComponents = await this.apiClient.getAll();

    if (existingComponents.length === 0) {
      consola.info('No components to delete');
      return;
    }

    await Promise.allSettled(
      existingComponents.map(async (comp) => {
        try {
          await this.apiClient.delete(comp.id);
          consola.success(`✓ Deleted: ${comp.name}`);
        } catch (error) {
          consola.error(`✗ Failed to delete ${comp.name}:`, error);
        }
      }),
    );

    consola.success(`✓ Deleted ${existingComponents.length} component(s)`);
  }

  private async seedOne(name: string, component: ValidatedComponent): Promise<void> {
    try {
      await this.apiClient.create(name, component);
      consola.success(`✓ Created: ${name}`);
    } catch (error) {
      consola.error(`✗ Failed to create ${name}:`, error);
      throw error;
    }
  }

  private async updateOne(name: string, component: ValidatedComponent): Promise<void> {
    try {
      await this.apiClient.update(name, component);
      consola.success(`✓ Updated: ${name}`);
    } catch (error) {
      consola.error(`✗ Failed to update ${name}:`, error);
      throw error;
    }
  }
}

// ============================================================================
// COMMAND EXECUTOR
// ============================================================================

class CommandExecutor {
  constructor(private readonly seedService: ComponentSeedService) {}

  private readonly commandMap: Record<SeedCommand, () => Promise<void>> = {
    create: () => this.seedService.seedAll(),
    update: () => this.seedService.updateAll(),
    delete: () => this.seedService.deleteAll(),
  };

  async execute(command: string): Promise<void> {
    if (!this.isValidCommand(command)) {
      throw new InvalidCommandError(command);
    }

    await this.commandMap[command]();
  }

  private isValidCommand(command: string): command is SeedCommand {
    return command in this.commandMap;
  }

  static getUsageMessage(): string {
    return 'Usage: tsx seeds/seed.ts [create|update|delete]';
  }
}

// ============================================================================
// CLI HANDLER
// ============================================================================

class CliHandler {
  constructor(private readonly executor: CommandExecutor) {}

  async run(args: string[]): Promise<void> {
    const command = args[2];

    if (!command) {
      consola.info(CommandExecutor.getUsageMessage());
      process.exit(1);
    }

    try {
      await this.executor.execute(command);
      process.exit(0);
    } catch (error) {
      this.handleError(error);
      process.exit(1);
    }
  }

  private handleError(error: unknown): void {
    if (error instanceof InvalidCommandError) {
      consola.error(error.message);
      consola.info(CommandExecutor.getUsageMessage());
      return;
    }

    if (error instanceof ApiRequestError) {
      consola.error(`API Error [${error.statusCode ?? 'UNKNOWN'}]: ${error.message}`);
      if (error.endpoint) {
        consola.error(`Endpoint: ${error.endpoint}`);
      }
      return;
    }

    if (error instanceof Error) {
      consola.error(`Error: ${error.message}`);
      return;
    }

    consola.error('Unknown error occurred');
  }
}

// ============================================================================
// DEPENDENCY INJECTION & BOOTSTRAP
// ============================================================================

function bootstrap(): CliHandler {
  const apiClient = new ComponentApiClient(Config.API_URL);
  const seedService = new ComponentSeedService(apiClient, Config.COMPONENTS);
  const executor = new CommandExecutor(seedService);
  const cli = new CliHandler(executor);

  return cli;
}

// ============================================================================
// ENTRY POINT
// ============================================================================

async function main(): Promise<void> {
  const cli = bootstrap();
  await cli.run(process.argv);
}

main();
