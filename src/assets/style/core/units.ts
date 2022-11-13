import type { TUnits as T } from '../types'
import { createObj, getCssVar } from '../utils'

const TYPE: T.Type = 'unit'

const TYPE_MODES: T.TypeModes = Array.from({ length: 20 }, (_, idx) => idx + 1) as any

const TYPES: T.Types = TYPE_MODES.map((no) => `${TYPE}_${no}`) as any

const Units: T.Units = createObj(TYPES, (_, idx) => {
    return `${getCssVar(`base-unit-${TYPE_MODES[idx]}-px`, '0px')}` as any
})

export default Units
