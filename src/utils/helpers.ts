// await delay(1000)
export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// [1, 2, 2, 2, 3, 3].filter(onlyUnique) == [1, 2, 3]
export const onlyUnique = <T>(value: T, index: number, array: T[]) => array.indexOf(value) === index;
