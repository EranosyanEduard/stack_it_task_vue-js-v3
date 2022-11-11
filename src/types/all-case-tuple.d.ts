/**
 * @description
 * Тип, представляющий кортеж, который содержит элементы, полученные путем
 * преобразования параметра **S** в различные регистры.
 * @example
 * const fooTuple: AllCaseTuple<'foo'> = ['Foo', 'foo', 'FOO'];
 */
type AllCaseTuple<S extends string> = [Capitalize<S>, Lowercase<S>, Uppercase<S>]
