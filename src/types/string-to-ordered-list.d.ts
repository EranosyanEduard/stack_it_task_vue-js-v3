/**
 * @description
 * Тип, представляющий массив, элементами которого являются пронумерованный
 * параметр **S**.
 * @example
 * const units: StringToOrderedList<'unit', [1, 2, 3, 4, 5]> = [
 *   'unit_1', 'unit_2', 'unit_3', 'unit_4', 'unit_5'
 * ];
 */
type StringToOrderedList<S extends string, Nums extends number[]> = {
    [P in keyof Nums]: `${S}${Chars['LowDash']}${Nums[P]}`
}
