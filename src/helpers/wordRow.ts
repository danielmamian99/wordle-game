/*
 * description: This function compares arrays of the same size
 * return: true if are equals, false if are differents
 */
export const equalsArrays = (array1: string[], array2: string[]): boolean => {
  let areEquals = true;
  array1.forEach((element: string, index: number) => {
    if (element !== array2[index]) {
      areEquals = false;
      return;
    }
  });
  return areEquals;
};

