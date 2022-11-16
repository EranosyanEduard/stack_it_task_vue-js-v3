<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { Units } from '#style'
import { type TInput, UInput } from '@/components'

const emit = defineEmits(['changePage'])

const props = defineProps({
    itemPerPage: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true
    }
})

const currentPageNo: Ref<number> = ref(1)
const page: Ref<TInput.IVModel> = ref({ id: 'page', isDirty: false, isValid: true, value: '1' })

watch(page, (next) => {
    const { isValid, value } = next

    if (isValid && !value.startsWith('0')) {
        const nextPage = parseInt(value, 10)
        const startIdx = (nextPage - 1) * props.itemPerPage

        if (startIdx < props.size) {
            currentPageNo.value = nextPage
            const endIdx = nextPage * props.itemPerPage

            emit('changePage', [startIdx, endIdx > props.size ? props.size : endIdx])
            console.log([startIdx, endIdx > props.size ? props.size : endIdx])
        }
    }
})
</script>

<template>
    <div :style="{ columnGap: Units.unit_5 }">
        <IInput
            v-model="page"
            :disabled="size === 0"
            :id="page.id"
            noHint
            :validator="UInput.useValidator(UInput.validators.onlyDigits)"
            :width="Units.unit_15"
        />
        <span>{{ `${currentPageNo} стр.` }}</span>
        <span>{{ `Всего записей: ${size}` }}</span>
    </div>
</template>

<style scoped>
div {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: center;
}
</style>
