export abstract class MockModel<T> {
  protected abstract mockStub: T;

  constructor(createEntityData: T) {
    this.constructorSpy(createEntityData);
  }

  constructorSpy(_createEntityData: T): void {}

  async save(): Promise<T> {
    return this.mockStub;
  }
}
