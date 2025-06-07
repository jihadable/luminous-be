import { sum } from "../src/utils/sum"

test("sum(1, 2) must be 3", () => {
    const result = sum(1, 2)

    expect(result).toBe(3)
})