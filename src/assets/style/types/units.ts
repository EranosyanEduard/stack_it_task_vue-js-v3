/**
 * @description
 * Тип, представляющий название базовой единицы.
 */
export type Type = 'unit'

/**
 * @description
 * Тип, представляющий модификаторы базовой единицы.
 */
export type TypeModes = NumRange<20>

/**
 * @description
 * Тип, представляющий все названия значений, вычисленных на основе базовой
 * единицы.
 */
export type Types = StringToOrderedList<Type, TypeModes>

/**
 * @description
 * Тип, представляющий объект, позволяющий использовать значения, вычисленные
 * на основе базовой единицы.
 */
export type Units = {
    [P in TupleToUnion<Types>]: CssVar<
        Join<['base', ...Split<P, Chars['LowDash']>, 'px'], Chars['Dash']>,
        '0px'
    >
}
