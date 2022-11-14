<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { Colors } from '#style'

const props = defineProps({
    background: {
        type: String,
        default: Colors.background.darken_1
    }
})

const style: ComputedRef<{ background: string }> = computed(() => ({
    background: props.background
}))
</script>

<template>
    <div class="popup" :style="style">
        <div><slot></slot></div>
    </div>
</template>

<style scoped>
.popup {
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
}

.popup > div {
    margin: auto;
}
</style>
