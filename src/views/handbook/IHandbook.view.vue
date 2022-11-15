<script setup lang="ts">
import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { Colors, Units } from '#style'
import { UInput, type TForm, type TInput, type TTable } from '@/components'

const createTRow = (data: Record<'name' | 'person' | 'phone', string>): TTable.ICell[] => {
    const { name, person, phone } = data
    return [{ text: name }, { text: person }, { text: phone, style: phoneCellStyle }]
}

const sortTextAscendingOrder = (a: string, b: string): -1 | 0 | 1 => (a < b ? -1 : a > b ? 1 : 0)
const sortTextDescendingOrder = (a: string, b: string): -1 | 0 | 1 => (a > b ? -1 : a < b ? 1 : 0)

const addCompanyBtnWidth = `calc(${Units.unit_10} * 5)`

const headers: readonly TTable.IHeader[] = [
    { text: 'Название организации', useSort: true },
    { text: 'ФИО руководителя', useSort: true },
    { text: 'Телефон', useSort: false }
]

const phoneCellStyle = {
    color: Colors.primary.base,
    fontSize: '1.25rem',
    justifyContent: 'end'
} as const

const inputs: readonly TForm.IInput[] = [
    {
        id: 'name',
        label: 'Название организации',
        rules: [UInput.validators.required],
        type: 'text'
    },
    {
        id: 'phone',
        label: 'Телефон',
        rules: [UInput.validators.required, UInput.validators.phone],
        type: 'text'
    },
    {
        id: 'person',
        label: 'ФИО руководителя',
        rules: [UInput.validators.required, UInput.validators.onlyLettersAndSpaces],
        type: 'text'
    }
]

const rows: Ref<Array<TTable.ICell[]>> = ref([
    [{ text: 'f' }, { text: 'b' }, { text: 'b', style: phoneCellStyle }],
    [{ text: 'e' }, { text: 'c' }, { text: 'c', style: phoneCellStyle }],
    [{ text: 'g' }, { text: 'a' }, { text: 'a', style: phoneCellStyle }]
])

const search: Ref<TInput.IVModel> = ref({ id: 'search', isValid: true, value: '' })
const showAddCompanyPopUp: Ref<boolean> = ref(false)
const submitBtnLoading: Ref<boolean> = ref(false)

const compRows: ComputedRef<Array<TTable.ICell[]>> = computed(() => {
    const personNameStart = search.value.value
    return personNameStart.length > 0
        ? rows.value.filter((cells) => cells[1].text.startsWith(personNameStart))
        : rows.value
})

const toggleShowAddCompanyPopUp = (): void => {
    showAddCompanyPopUp.value = !showAddCompanyPopUp.value
}

const onCell = (evtPayload: TTable.IOnCellEvent): void => {
    if (evtPayload.event === 'remove') {
        rows.value = rows.value.filter((_, idx) => idx !== evtPayload.row)
    }
}

const onSortColumn = (evtPayload: TTable.ISortedColumn): void => {
    const sort = evtPayload.mode === 'ascending' ? sortTextAscendingOrder : sortTextDescendingOrder

    rows.value = rows.value
        .slice()
        .sort((cellsA, cellsB) => sort(cellsA[evtPayload.cell].text, cellsB[evtPayload.cell].text))
}

const onSubmit = async (evtPayload: Parameters<typeof createTRow>[0]): Promise<void> => {
    submitBtnLoading.value = true

    try {
        rows.value = await new Promise((resolve) => {
            setInterval(resolve, 2000, [createTRow(evtPayload), ...rows.value])
        })
        toggleShowAddCompanyPopUp()
    } catch (error) {
        console.error('error')
    } finally {
        submitBtnLoading.value = false
    }
}
</script>

<template>
    <div class="handbook" :style="{ gap: Units.unit_5 }">
        <!-- Row 1 -->
        <IInput v-model="search" :id="search.id" noHint noLabel placeholder="ФИО руководителя" />
        <IButton
            class="column_no_last"
            :width="addCompanyBtnWidth"
            @click="toggleShowAddCompanyPopUp"
        >
            Добавить
        </IButton>
        <!-- Row 2 -->
        <ITable
            class="column_no_all"
            :headers="headers"
            useRemove
            :rows="compRows"
            @cell="onCell"
            @sortColumn="onSortColumn"
        ></ITable>
        <!-- Row 3 -->
        <div class="column_no_last" style="background: green; height: 100px"></div>
        <!-- No flow -->
        <IPopUp v-if="showAddCompanyPopUp">
            <IForm
                :inputs="inputs"
                legend="Добавить организацию"
                resetBtnText="Отмена"
                submitBtnText="Добавить"
                :submitBtnLoading="submitBtnLoading"
                @reset="toggleShowAddCompanyPopUp"
                @submit="onSubmit"
            />
        </IPopUp>
    </div>
</template>

<style scoped>
.handbook {
    display: grid;
    grid-template: auto 1fr auto / 30% 1fr 30%;
}

.column_no_all {
    grid-column: 1 / -1;
}
.column_no_last {
    grid-column-end: -1;
    justify-self: end;
}
</style>