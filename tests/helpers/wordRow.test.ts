import { fireEvent, render, screen } from "@testing-library/react";
import { equalsArrays } from "../../src/helpers";

describe("wordRow", () => {
  test("should return true since the arrays are the same", () => {
    const array1 = ['soy', 'un', 'array'];
    const array2 = ['soy', 'un', 'array'];
    equalsArrays(array1, array2)
    expect(equalsArrays(array1, array2)).toBe(true);
  });
  test("should return false since the arrays are the different", () => {
    const array1 = ['soy', 'un', 'array'];
    const array2 = ['soy', 'otro', 'array'];
    equalsArrays(array1, array2)
    expect(equalsArrays(array1, array2)).toBe(false);
  });
});
