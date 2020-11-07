import { sampleFunction1 } from "./module-with-function";
jest.mock("./module-with-function");

// npx jest module-with -t "simple sample function test"
test('simple sample function test', () =>{
    const result = sampleFunction1();
    expect(result).toBe(undefined);
});
