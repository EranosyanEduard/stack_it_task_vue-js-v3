/**
 * @description
 * Тип, позволяющий перевернуть массив или строку **S**.
 * @example
 * const cba: Reverse<'abc'> = 'cba';
 * const cbaArr: Reverse<['a', 'b', 'c']> = ['c', 'b', 'a'];
 */
type Reverse<S extends string | any[]> = S extends string
    ? Join<Reverse<Split<S, Chars['EmptyStr']>>, Chars['EmptyStr']>
    : S extends any[]
    ? UReverse<S>
    : never

type UReverse<Arr extends any[], Acc extends any[] = []> = Arr extends [infer Head, ...infer Tail]
    ? UReverse<Tail, Unshift<Acc, Head>>
    : Acc
