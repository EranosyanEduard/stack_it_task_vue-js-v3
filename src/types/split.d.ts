/**
 * @description
 * Тип, представляющий массив, элементами которого являются части исходного
 * параметра **S**.
 * @example
 * type Apple = 'Apple';
 * const apple: Split<Apple, ''> = ['a', 'p', 'p', 'l', 'e'];
 */
type Split<S extends string, Separator extends string> = USplit<S, Separator>

type USplit<
    S extends string,
    Separator extends string,
    ArrAcc extends string[] = [],
    StrAcc extends string = Chars['EmptyStr']
> = string extends S
    ? string[]
    : Separator extends Chars['EmptyStr']
    ? USplitByChar<S>
    : S extends `${infer Head}${infer Tail}`
    ? Head extends Separator
        ? USplit<Tail, Separator, Push<ArrAcc, StrAcc>, ''>
        : USplit<Tail, Separator, ArrAcc, `${StrAcc}${Head}`>
    : Push<ArrAcc, StrAcc>

type USplitByChar<
    S extends string,
    Acc extends string[] = []
> = S extends `${infer Head}${infer Tail}` ? USplitByChar<Tail, Push<Acc, Head>> : Acc
