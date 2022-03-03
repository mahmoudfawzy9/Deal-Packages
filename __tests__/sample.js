/* __tests__/sample.js */

function sum(a, b) {
    return a + b;
}
test("A sample test", () => {
    expect(sum(3, 2)).toBe(5);
});