<script setup lang="ts">
import { computed, ref, watchEffect, type ComputedRef, type PropType, type Ref } from 'vue'
import { Colors, Units } from '#style'
import { UInput, type TForm, type TInput, type TPagination, type TTable } from '@/components'
import type { Company } from './IHandbook.type'

const createTRow = (data: Company): TTable.ICell[] => {
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

const itemPerPage = 15

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

const props = defineProps({
    companies: {
        type: Array as PropType<Company[]>,
        required: true
    }
})

const rows: Ref<Array<TTable.ICell[]>> = ref([])

watchEffect(() => {
    rows.value = props.companies.map(createTRow)
})

const records: Ref<TPagination.OnChangePageEvent> = ref([0, itemPerPage])
const search: Ref<TInput.IVModel> = ref({ id: 'search', isValid: true, value: '' })
const showAddCompanyPopUp: Ref<boolean> = ref(false)
const submitBtnLoading: Ref<boolean> = ref(false)

const compRows: ComputedRef<Array<TTable.ICell[]>> = computed(() => {
    const personNameStart = search.value.value.toLowerCase()
    const slice = rows.value.slice(records.value[0], records.value[1])

    return personNameStart.length > 0
        ? slice.filter((cells) => cells[1].text.toLowerCase().startsWith(personNameStart))
        : slice
})

const toggleShowAddCompanyPopUp = (): void => {
    showAddCompanyPopUp.value = !showAddCompanyPopUp.value
}

const onCell = (evtPayload: TTable.IOnCellEvent): void => {
    if (evtPayload.event === 'remove') {
        rows.value = rows.value.filter((_, idx) => idx !== evtPayload.row)
    }
}

const onChangePage = (evtPayload: TPagination.OnChangePageEvent): void => {
    records.value = evtPayload
}

const onSortColumn = (evtPayload: TTable.ISortedColumn): void => {
    const sort = evtPayload.mode === 'ascending' ? sortTextAscendingOrder : sortTextDescendingOrder

    rows.value = rows.value
        .slice()
        .sort((cellsA, cellsB) =>
            sort(
                cellsA[evtPayload.cell].text.toLowerCase(),
                cellsB[evtPayload.cell].text.toLowerCase()
            )
        )
}

const onSubmit = async (evtPayload: Company): Promise<void> => {
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
        <IPagination
            class="column_no_last"
            :itemPerPage="itemPerPage"
            :size="rows.length"
            @changePage="onChangePage"
        ></IPagination>
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
