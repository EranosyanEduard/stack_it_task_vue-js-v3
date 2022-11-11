/**
 * @description
 * Тип, представляющий обращение к css-переменной.
 * @example
 * const cssVar: CssVar<'color-bg', '#fff'> = 'var(--color-bg, #fff)';
 */
type CssVar<Id extends string, V extends string> = Join<['var(--', Id, ', ', V, ')'], ''>
