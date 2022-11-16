import type { IValidationRule, UseValidator } from './IInput.type'

// #region 'Validation rules'
const useValidator: UseValidator =
    (...args) =>
    (input) =>
        args.find(({ validator }) => !validator(input))?.error ?? ''

const onlyLettersAndSpaces: IValidationRule = {
    error: 'Используйте символы алфавита и пробелы',
    validator: (input) => /^[a-zа-яё ]+$/i.test(input)
}

const onlyDigits: IValidationRule = {
    error: 'Используйте цифры',
    validator: (input) => /^\d+$/.test(input)
}

const phone: IValidationRule = {
    error: 'Допустимый формат: +7 (000) 000 00 00',
    validator: (input) => /^(\+7|8) ?(\(\d{3}\)|\d{3}) ?\d{3} ?\d{2} ?\d{2}$/i.test(input)
}

const required: IValidationRule = {
    error: 'Заполните данное поле',
    validator: (input) => input.length > 0
}

const validators = {
    onlyDigits,
    onlyLettersAndSpaces,
    phone,
    required
} as const
// #endregion 'Validation rules'

export { validators, useValidator }
