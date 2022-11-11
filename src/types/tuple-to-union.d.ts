/**
 * @description
 * Тип, представляющий элементы массива в виде типа-суммы.
 */
type TupleToUnion<T extends any[]> = T[number]
