<script setup lang="ts">
import { computed, type ComputedRef, type PropType } from 'vue'
import { Colors, Units } from '#style'

// #region 'Types'
/**
 * @description
 * Тип, представляющий значение вычисляемого свойства **style**.
 */
export type Style = Record<
    'backgroundColor' | 'border' | 'borderRadius' | 'color' | 'height' | 'width',
    string
>

/**
 * @description
 * Тип, представляющий объект, содержащий свойства, зависящие от значения
 * props-а outlined.
 */
export type OutlinedDeps = Pick<Style, 'backgroundColor' | 'border' | 'color'>
// #endregion 'Types'

const props = defineProps({
    color: {
        type: String,
        default: Colors.primary.base
    },
    disabled: {
        type: Boolean,
        default: false
    },
    height: {
        type: String,
        default: Units.unit_10
    },
    loading: {
        type: Boolean,
        default: false
    },
    outlined: {
        type: Boolean,
        default: false
    },
    rounded: {
        type: String,
        default: Units.unit_1
    },
    type: {
        type: String as PropType<'button' | 'reset' | 'submit'>,
        default: 'button'
    },
    width: {
        type: String,
        default: 'auto'
    }
})

const spinnerSize: ComputedRef<string> = computed(() => `calc(${props.height} / 3)`)

const style: ComputedRef<Style> = computed(() => {
    const [colorA, colorB] = [
        props.disabled ? Colors.grey.base : props.color,
        Colors.background.base
    ]

    const outlinedDeps: OutlinedDeps = props.outlined
        ? {
              backgroundColor: colorB,
              border: 'thin solid currentColor',
              color: colorA
          }
        : {
              backgroundColor: colorA,
              border: 'none',
              color: colorB
          }

    return {
        borderRadius: props.rounded,
        height: props.height,
        width: props.width,
        ...outlinedDeps
    }
})
</script>

<template>
    <button class="button" :disabled="disabled" :style="style" :type="type">
        <ISpinner v-if="loading" color="inherit" :size="spinnerSize" />
        <slot v-else></slot>
    </button>
</template>

<style scoped>
.button {
    cursor: pointer;
    text-transform: uppercase;
    transition: transform 0.1s;
}
.button:hover {
    transform: scale(1.1);
}
.button:disabled {
    cursor: default;
    opacity: 1;
    transform: none;
}
</style>
