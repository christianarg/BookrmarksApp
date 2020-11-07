import { sampleFunction1 } from "./module-with-function";
jest.mock("./module-with-function");

const sampleFunction1Mock = sampleFunction1 as unknown as jest.Mock;

// npx jest module-with -t "simple sample function test"
test('simple sample function test', () =>{
    // ARRANGE
    const mockedReturnValue = "Bye";
    sampleFunction1Mock.mockReturnValue(mockedReturnValue);
    
    // ACT
    const result = sampleFunction1();
    
    // ASSERT
    expect(result).toBe(mockedReturnValue);
});
