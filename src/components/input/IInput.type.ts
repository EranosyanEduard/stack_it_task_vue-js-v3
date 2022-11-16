/**
 * @description
 * Тип, представляющий допустимые значения атрибута **type** поля ввода.
 */
export type InputTypes = ['text']

/**
 * @description
 * Интерфейс, представляющий правило валидации.
 */
export interface IValidationRule<T = string> {
    error: string
    validator: Predicate<T>
}

/**
 * @description
 * Тип, представляющий полезную нагрузку события **input** поля ввода.
 */
export interface IVModel {
    id: string
    isDirty: boolean
    isValid: boolean
    value: string
}

/**
 * @description
 * Тип, представляющий значение вычисляемого свойства **inputStyle**.
 */
export type Style = Record<'borderRadius' | 'borderWidth' | 'height' | 'padding' | 'width', string>

/**
 * @description
 * Тип, представляющий фабрику функций для проверки значения поля ввода.
 */
export type UseValidator = (...args: IValidationRule[]) => (input: string) => string
