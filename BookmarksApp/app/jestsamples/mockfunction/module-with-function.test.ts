import { sampleFunction1 } from "./module-with-function";

// npx jest module-with -t "simple sample function test"
test('simple sample function test', () =>{
    const result = sampleFunction1();
    expect(result).toBe("Hello");
});

test('repeat to skipy with jest options', () =>{
    const result = sampleFunction1();
    expect(result).toBe("Hello");
});

// npx jest module-with -t "simple sample function test"
describe("tests in describe block", () =>{
    test('test in describe', () =>{
        const result = sampleFunction1();
        expect(result).toBe("Hello");
    });
});