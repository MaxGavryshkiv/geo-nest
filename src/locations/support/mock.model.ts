export abstract class MockModel<T> {
  protected abstract mockStub: T;

  constructor(createEntityData: T) {
    this.constructorSpy(createEntityData);
  }

  constructorSpy(_createEntityData: T): void {}

  find(): { exec: () => [T] } {
    return {
      exec: (): [T] => [this.mockStub],
    };
  }

  async findById(): Promise<T> {
    return this.mockStub;
  }

  async save(): Promise<T> {
    return this.mockStub;
  }

  async findOneAndUpdate(): Promise<T> {
    return this.mockStub;
  }
}
