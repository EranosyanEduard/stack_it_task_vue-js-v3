<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { Colors, Units } from '#style'

// #region 'Types'
type Style = Record<'border' | 'color' | 'height' | 'width', string>
// #endregion 'Types'

const props = defineProps({
    color: {
        type: String,
        default: Colors.primary.base
    },
    size: {
        type: String,
        required: true
    }
})

const style: ComputedRef<Style> = computed(() => {
    return {
        border: `${Units.unit_1} solid currentColor`,
        color: props.color,
        height: props.size,
        width: props.size
    }
})
</script>

<template>
    <div class="spinner" :style="style"></div>
</template>

<style scoped>
@keyframes rotate360 {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}

.spinner {
    animation: rotate360 0.5s linear infinite;
    border-right-color: rgba(0 0 0 / 0) !important;
    border-radius: 50%;
}
</style>
