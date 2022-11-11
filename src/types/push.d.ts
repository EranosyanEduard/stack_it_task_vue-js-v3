/**
 * @description
 * Тип, добавляющий параметр **Last** в качестве последнего элемента
 * параметра **Arr**, представляющего массив.
 * @example
 * type Pair = [1, 2];
 * const triple: Push<Pair, 3> = [1, 2, 3];
 */
type Push<Arr extends any[], Last> = [...Arr, Last]
