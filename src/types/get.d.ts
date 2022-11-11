/**
 * @description
 * Тип, позволяющий получить тип элемента массива или строки **S** с индексом,
 * соответствующим параметру **Idx**.
 * @example
 * type Bar = 'Bar';
 * const a: Get<Bar, 1> = 'a';
 * const undefA: Get<Bar, 3> = undefined;
 *
 * type Pair = [1, 2];
 * const two: Get<Pair, 1> = 2;
 * const undefB: Get<Pair, 2> = undefined;
 */
type Get<S extends string | any[], Idx extends number> = S extends string
    ? UGetFromStr<S, Idx>
    : S extends any[]
    ? UGetFromArr<S, Idx>
    : never

type UGetFromArr<
    Arr extends any[],
    Idx extends number,
    Acc extends any[] = []
> = Acc['length'] extends Idx ? Arr[Idx] : UGetFromArr<Arr, Idx, Push<Acc, null>>

type UGetFromStr<
    Str extends string,
    Idx extends number,
    Acc extends any[] = []
> = Str extends `${infer Head}${infer Tail}`
    ? Acc['length'] extends Idx
        ? Head
        : UGetFromStr<Tail, Idx, Push<Acc, null>>
    : undefined
