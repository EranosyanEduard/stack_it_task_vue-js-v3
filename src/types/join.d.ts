/**
 * @description
 * Тип, объединяющий элементы параметра **Arr** в тип, представляющий строковый
 * литерал, используя в качестве разделителя параметр **Separator**.
 */
type Join<Arr extends Array<number | string>, Separator extends number | string> = UJoin<
    Arr,
    Separator
>

type UJoin<
    Arr extends any[],
    Separator extends number | string,
    Acc extends string = Chars['EmptyStr']
> = Arr extends [infer Head, ...infer Tail]
    ? UJoin<Tail, Separator, `${Acc}${Separator}${Head extends number ? Head : Head & string}`>
    : Acc extends `${infer Hd}${infer Tl}`
    ? Hd extends `${Separator}`
        ? Tl
        : Acc
    : Chars['EmptyStr']
