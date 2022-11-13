import type { TColors as T } from '../types'
import { createObj, getCssVar } from '../utils'

const TYPES: T.Types = ['background', 'error', 'grey', 'primary', 'secondary']

const TYPE_MODES_1: T.TypeModes1 = ['base', 'darken', 'lighten']

const TYPE_MODES_2: T.TypeModes2 = [1, 2, 3, 4, 5]

const TYPE_MODES: T.TypeModes = TYPE_MODES_1.flatMap((type) => {
    return type === 'base' ? type : TYPE_MODES_2.map((no) => `${type}_${no}`)
}) as any

const Colors: T.Colors = createObj(TYPES, (type) => {
    return createObj(TYPE_MODES, (mode) => {
        return getCssVar(`color-${type}-${mode.replace('_', '-')}`, 'initial')
    }) as any
})

export default Colors
