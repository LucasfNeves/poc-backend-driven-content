export class Screen {

  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly config: Record<string, any>,
    public readonly themeName: string | null,
    public readonly version: number,
    public readonly isActive: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  )
  {
    this.validate();

  }


  private validate(): void {
    if  (!this.name || this.name.trim() === "") {
      throw new Error('Screen name is required');
    }
  }
}
