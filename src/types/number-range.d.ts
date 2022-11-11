/**
 * @description
 * Тип, представляющий массив, элементами которого являются числа от 1 до **N**.
 * @example
 * const five: NumRange<5> = [1, 2, 3, 4, 5];
 */
type NumRange<N extends number> = UNumRange<N>

type UNumRange<N extends number, Acc extends number[] = []> = Acc['length'] extends N
    ? Acc
    : UNumRange<N, Push<Acc, Add<Acc['length']>>>
