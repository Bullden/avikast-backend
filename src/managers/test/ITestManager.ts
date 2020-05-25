export default abstract class ITestManager {
  abstract add(...values: number[]): Promise<number>;
}
