/**
 * @description
 * Тип, увеличивающий значение параметра **N**, представляющего неотрицательное
 * целое число, на 1.
 * @example
 * const one: Add<0> = 1;
 */
type Add<N extends number> = UAdd<N>

type UAdd<N extends number, Acc extends any[] = []> = Acc['length'] extends N
    ? Push<Acc, null>['length']
    : UAdd<N, Push<Acc, null>>
