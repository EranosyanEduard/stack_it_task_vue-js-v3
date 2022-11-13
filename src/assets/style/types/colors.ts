/**
 * @description
 * Тип, представляющий типы цветов.
 */
export type Types = ['background', 'error', 'grey', 'primary', 'secondary']

/**
 * @description
 * Тип, представляющий названия модификаторов типов цветов.
 */
export type TypeModes1 = ['base', 'darken', 'lighten']

/**
 * @description
 * Тип, представляющий дополнительные модификаторы типов цветов.
 */
export type TypeModes2 = NumRange<5>

/**
 * @description
 * Тип, представляющий все названия значений, доступных для каждого типа цвета.
 */
export type TypeModes = Flat<
    [
        First<TypeModes1>,
        StringToOrderedList<Get<TypeModes1, 1>, TypeModes2>,
        StringToOrderedList<Last<TypeModes1>, TypeModes2>
    ]
>

/**
 * @description
 * Тип, представляющий объект, позволяющий использовать значения цветовой схемы
 * приложения.
 */
export type Colors = {
    [P1 in TupleToUnion<Types>]: {
        [P2 in TupleToUnion<TypeModes>]: CssVar<
            Join<['color', P1, ...Split<P2, Chars['LowDash']>], Chars['Dash']>,
            'initial'
        >
    }
}
