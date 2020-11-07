// Test para mostrar que en principio da igual el orden del jest.mock
jest.mock("./module-with-function");
import { sampleFunction1 } from "./module-with-function";

// npx jest module-with -t "simple sample function test"
test('simple sample function test', () =>{
    const result = sampleFunction1();
    expect(result).toBe(undefined);
});
