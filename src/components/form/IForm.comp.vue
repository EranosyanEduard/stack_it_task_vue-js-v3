<script setup lang="ts">
import { computed, reactive, ref, watch, type ComputedRef, type PropType, type Ref } from 'vue'
import { Colors, Units } from '#style'
import type { IInput, Style } from './IForm.type'
import type { TInput } from '../input'

const btnWidth = '25%'

const emit = defineEmits(['reset', 'submit'])

const props = defineProps({
    inputs: {
        type: Array as PropType<IInput[]>,
        required: true
    },
    legend: {
        type: String,
        required: true
    },
    resetBtnText: {
        type: String,
        required: true
    },
    rounded: {
        type: String,
        default: Units.unit_1
    },
    submitBtnLoading: {
        type: Boolean,
        default: false
    },
    submitBtnText: {
        type: String,
        required: true
    }
})

const inputValues: TInput.IVModel[] = reactive(
    props.inputs.map(({ id }) => ({
        id,
        isValid: true,
        value: ''
    }))
)
const submitBtnDisabled: Ref<boolean> = ref(true)

const style: ComputedRef<Style> = computed(() => {
    return {
        background: Colors.background.base,
        borderRadius: props.rounded,
        boxShadow: `0 0 ${Units.unit_12} ${Colors.background.darken_1}`,
        padding: Units.unit_5,
        rowGap: Units.unit_5
    }
})

watch(inputValues, (next) => {
    for (const { isValid } of next) {
        if (!isValid) {
            submitBtnDisabled.value = true
            return
        }
    }
    submitBtnDisabled.value = false
})

const onSubmit = (_evt: SubmitEvent): void => {
    emit(
        'submit',
        inputValues.reduce<Record<string, string>>((acc, { id, value }) => {
            acc[id] = value
            return acc
        }, {})
    )
}
</script>

<template>
    <form action="#" @submit.prevent="onSubmit">
        <fieldset>
            <div :style="style">
                <legend>{{ legend }}</legend>
                <IInput
                    v-for="(input, index) of inputs"
                    v-model="inputValues[index]"
                    :id="input.id"
                    :key="input.id"
                    :label="input.label"
                    :rules="input.rules"
                    :type="input.type"
                />
                <div>
                    <IButton
                        outlined
                        :style="{ marginRight: Units.unit_5 }"
                        :width="btnWidth"
                        @click="$emit('reset')"
                    >
                        {{ resetBtnText }}
                    </IButton>
                    <IButton
                        :disabled="submitBtnDisabled"
                        :loading="submitBtnLoading"
                        type="submit"
                        :width="btnWidth"
                    >
                        {{ submitBtnText }}
                    </IButton>
                </div>
            </div>
        </fieldset>
    </form>
</template>

<style scoped>
fieldset {
    border: none;
    margin: 0;
    padding: 0;
}

fieldset > div {
    display: grid;
    box-sizing: border-box;
    min-width: 400px;
    width: 25vw;
}

legend {
    font-size: 1.25rem;
    font-weight: bold;
}

fieldset > div > div:last-of-type {
    display: flex;
    justify-content: flex-end;
}
</style>
