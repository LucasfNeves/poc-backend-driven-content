import * as components from './components';
import { Component } from '@/domain/components/types/types';
import { consola } from 'consola';

// ============================================================================
// Configuration
// ============================================================================

const API_URL = process.env.API_URL || 'http://localhost:3000/api/components';
const REQUEST_TIMEOUT = 10000; // 10 seconds

// ============================================================================
// Types
// ============================================================================

interface ComponentDefinition {
  name: string;
  component: Component;
}

interface ApiError {
  message?: string;
}

interface ComponentResponse {
  id: string;
  name: string;
}

// ============================================================================
// Data
// ============================================================================

const componentsList: readonly ComponentDefinition[] = [
  { name: 'custom-header', component: components.customHeader },
] as const;

// ============================================================================
// HTTP Client
// ============================================================================

class ApiClient {
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor(baseUrl: string, timeout: number = REQUEST_TIMEOUT) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  private async fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  async get<T>(endpoint: string = ''): Promise<T> {
    const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`);
    return this.handleResponse<T>(response);
  }

  async delete(endpoint: string): Promise<void> {
    await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
    });
  }
}

// ============================================================================
// Component Operations
// ============================================================================

class ComponentSeeder {
  constructor(private readonly client: ApiClient) {}

  async createComponent(name: string, component: Component): Promise<void> {
    try {
      await this.client.post('', { name, component });
      consola.success('Created:', name);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      consola.error('Failed to create', name, ':', message);
      throw error;
    }
  }

  async updateComponent(name: string, component: Component): Promise<void> {
    try {
      await this.client.put(`/${name}`, { component });
      consola.success('Updated:', name);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      consola.error('Failed to update', name, ':', message);
      throw error;
    }
  }

  async deleteAllComponents(): Promise<void> {
    try {
      const response = await this.client.get<ComponentResponse[]>('');

      await Promise.all(
        response.map(async (comp: ComponentResponse) => {
          await this.client.delete(`/${comp.id}`);
          consola.success('Deleted:', comp.name);
        }),
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      consola.error('Failed to delete components:', message);
      throw error;
    }
  }

  async seed(components: readonly ComponentDefinition[]): Promise<void> {
    consola.start('Seeding components via API...');

    for (const { name, component } of components) {
      await this.createComponent(name, component);
    }

    consola.success('Seed completed!');
  }

  async update(components: readonly ComponentDefinition[]): Promise<void> {
    consola.start('Updating components via API...');

    for (const { name, component } of components) {
      await this.updateComponent(name, component);
    }

    consola.success('Update completed!');
  }

  async clean(): Promise<void> {
    consola.start('Cleaning all components...');
    await this.deleteAllComponents();
    consola.success('Clean completed!');
  }
}

// ============================================================================
// CLI Commands
// ============================================================================

type Command = 'create' | 'update' | 'delete';

const VALID_COMMANDS: readonly Command[] = ['create', 'update', 'delete'] as const;

function isValidCommand(cmd: string): cmd is Command {
  return VALID_COMMANDS.includes(cmd as Command);
}

async function executeCommand(command: Command): Promise<void> {
  const client = new ApiClient(API_URL);
  const seeder = new ComponentSeeder(client);

  switch (command) {
    case 'create':
      await seeder.seed(componentsList);
      break;
    case 'update':
      await seeder.update(componentsList);
      break;
    case 'delete':
      await seeder.clean();
      break;
  }
}

function showUsage(): void {
  consola.info(`Usage: tsx seeds/seed.ts [${VALID_COMMANDS.join('|')}]`);
  consola.info('Commands:');
  consola.info('  create  - Create all components');
  consola.info('  update  - Update all components');
  consola.info('  delete  - Delete all components');
}

// ============================================================================
// Main
// ============================================================================

async function main(): Promise<void> {
  const command = process.argv[2];

  if (!command || !isValidCommand(command)) {
    showUsage();
    process.exit(1);
  }

  try {
    await executeCommand(command);
    process.exit(0);
  } catch {
    consola.fail('Operation failed');
    process.exit(1);
  }
}

main();
