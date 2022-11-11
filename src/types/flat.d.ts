/**
 * @description
 * Тип, позволяющий преобразовать параметр **Arr** в тип, представляющий
 * плоский массив.
 * @example
 * type SomeArr = [1, [2], [[3]]];
 * const three: Flat<SomeArr> = [1, 2, 3];
 */
type Flat<Arr extends any[]> = UFlat<Arr>

type UFlat<Arr extends any[], Acc extends any[] = []> = Arr extends [infer Head, ...infer Tail]
    ? Head extends any[]
        ? UFlat<Tail, UFlat<Head, Acc>>
        : UFlat<Tail, Push<Acc, Head>>
    : Acc
