import type { TInput } from '@/components/input'

/**
 * @description
 * Интерфейс, представляющий поле ввода.
 */
export interface IInput {
    id: string
    label: string
    rules: Array<TInput.IValidationRule<string>>
    type: TupleToUnion<TInput.InputTypes>
}

/**
 * @description
 * Тип, представляющий значение вычисляемого свойства **style**.
 */
export type Style = Record<
    'background' | 'borderRadius' | 'boxShadow' | 'padding' | 'rowGap',
    string
>
