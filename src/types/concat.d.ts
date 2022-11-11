/**
 * @description
 * Тип, представляющий массив, полученный путем конкатенации параметров **ArrA**
 * и **ArrB**, представляющих массивы.
 * @example
 * type TupleA = [1, 2, 3];
 * type TupleB = [4, 5, 6];
 * const six: Concat<TupleA, TupleB> = [1, 2, 3, 4, 5, 6];
 */
type Concat<ArrA extends any[], ArrB extends any[]> = [...ArrA, ...ArrB]
