<script setup lang="ts">
import { computed, ref, watch, type ComputedRef, type PropType, type Ref } from 'vue'
import { Colors, Units } from '#style'
import type { InputTypes, IValidationRule, IVModel, Style } from './IInput.type'

const emit = defineEmits(['update:modelValue'])

const emitUpdateVModel = (payload: IVModel) => emit('update:modelValue', payload)

const props = defineProps({
    color: {
        type: String,
        default: Colors.primary.base
    },
    height: {
        type: String,
        default: Units.unit_10
    },
    id: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    noHint: {
        type: Boolean,
        default: false
    },
    noLabel: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: Object as PropType<IVModel>,
        default: () => ({})
    },
    placeholder: {
        type: String,
        default: ''
    },
    rounded: {
        type: String,
        default: Units.unit_1
    },
    rules: {
        type: Array as PropType<IValidationRule[]>,
        default: () => []
    },
    type: {
        type: String as PropType<TupleToUnion<InputTypes>>,
        default: 'text'
    },
    width: {
        type: String,
        default: 'auto'
    }
})

const error: Ref<string> = ref('')
const isFocus: Ref<boolean> = ref(false)
const value: Ref<string> = ref('')

const color: ComputedRef<string> = computed(() => {
    if (error.value.length > 0) return Colors.error.base
    if (isFocus.value) return props.color
    return Colors.grey.base
})

const inputStyle: ComputedRef<Style> = computed(() => {
    return {
        borderWidth: `calc(${Units.unit_1} / 2)`,
        borderRadius: props.rounded,
        height: props.height,
        padding: Units.unit_2,
        width: props.width
    }
})

const rootStyle: ComputedRef<Record<'color' | 'rowGap', string>> = computed(() => {
    return {
        color: color.value,
        rowGap: Units.unit_2
    }
})

watch(value, (next) => {
    const payload: IVModel = {
        id: props.id,
        isValid: true,
        value: next
    }

    if (props.rules.length > 0) {
        for (const { error: err, validator } of props.rules) {
            if (!validator(next)) {
                error.value = err
                payload.isValid = false
                emitUpdateVModel(payload)
                return
            }
        }
        error.value = ''
    }
    emitUpdateVModel(payload)
})
</script>

<template>
    <div :style="rootStyle">
        <label v-show="!noLabel" :for="id">{{ label }}</label>
        <input
            v-model.trim="value"
            :id="id"
            :placeholder="placeholder"
            :style="inputStyle"
            :type="type"
            @focusin="isFocus = true"
            @focusout="isFocus = false"
        />
        <span v-show="!noHint">{{ error }}</span>
    </div>
</template>

<style scoped>
div {
    display: grid;
    grid-template-rows: 0.75rem auto 0.75rem;
}

label,
span {
    font-size: 0.75rem;
}

input {
    border-color: currentColor;
    border-style: solid;
    box-sizing: border-box;
    color: inherit;
    outline: none;
}

input::placeholder {
    letter-spacing: 0.05rem;
    text-transform: uppercase;
}
</style>
