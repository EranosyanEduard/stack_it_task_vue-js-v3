<script setup lang="ts">
import { computed, reactive, type ComputedRef, type PropType } from 'vue'
import { Colors, Units } from '#style'
import type { ICell, IHeader, ISortedColumn } from './ITable.type'

const cellStyle = { borderColor: Colors.grey.base, padding: `0 ${Units.unit_2}` } as const
const cellToRemove: ICell = {
    evtType: 'remove',
    style: { color: Colors.error.base, cursor: 'pointer' },
    text: 'X'
} as const
const emptyHeader: IHeader = { text: '', useSort: false } as const

const emit = defineEmits(['cell', 'sortColumn'])

const props = defineProps({
    headers: {
        type: Array as PropType<IHeader[]>,
        required: true,
        validator: (arg: IHeader[]): boolean => arg.length > 0
    },
    rowHeight: {
        type: String,
        default: Units.unit_10
    },
    rows: {
        type: Array as PropType<Array<ICell[]>>,
        default: () => []
    },
    useRemove: {
        type: Boolean,
        default: false
    }
})

const sortedColumn: ISortedColumn = reactive({
    cell: NaN,
    mode: 'descending'
})

const sortedColumnClass: ComputedRef<
    Join<['arrow', 'direction', 'down' | 'up'], Chars['LowDash']>
> = computed(() => {
    return `arrow_direction_${sortedColumn.mode === 'ascending' ? 'up' : 'down'}` as any
})

const tableContent: ComputedRef<{ headers: IHeader[]; rows: Array<ICell[]> }> = computed(() => {
    return props.rows.length > 0 && props.useRemove
        ? {
              headers: props.headers.concat(emptyHeader),
              rows: props.rows.map((cells) => cells.concat(cellToRemove))
          }
        : { headers: props.headers, rows: props.rows }
})

const rowStyle: ComputedRef<Record<'height', string>> = computed(() => ({
    height: props.rowHeight
}))

const onCell = (event = '', cell: number, row: number): void => {
    emit('cell', { event, cell, row })
}

const onSortedColumnBtn = (cell: number): void => {
    if (sortedColumn.cell === cell) {
        switch (sortedColumn.mode) {
            case 'ascending':
                sortedColumn.mode = 'descending'
                break
            case 'descending':
                sortedColumn.mode = 'ascending'
                break
            default:
                throw new Error(`Недопустимый тип сортировки: ${sortedColumn.mode}`)
        }
    } else {
        sortedColumn.cell = cell
        sortedColumn.mode = 'descending'
    }
    emit('sortColumn', sortedColumn)
}
</script>

<template>
    <table>
        <thead>
            <tr :style="rowStyle">
                <th
                    v-for="(header, idx) of tableContent.headers"
                    :key="header.text"
                    :style="cellStyle"
                >
                    <div>
                        <span :style="{ marginRight: Units.unit_2 }">{{ header.text }}</span>
                        <IButton
                            v-if="header.useSort"
                            :class="[sortedColumn.cell === idx && sortedColumnClass]"
                            :disabled="tableContent.rows.length === 0"
                            :height="Units.unit_5"
                            outlined
                            rounded="50%"
                            :width="Units.unit_5"
                            @click="onSortedColumnBtn(idx)"
                        >
                            >
                        </IButton>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="rows.length === 0" :style="rowStyle">
                <td :colspan="headers.length" :style="cellStyle">
                    <div>Данные отсутствуют</div>
                </td>
            </tr>
            <tr v-else v-for="(row, rowIdx) of tableContent.rows" :key="rowIdx" :style="rowStyle">
                <td v-for="(cell, cellIdx) of row" :key="cellIdx" :style="cellStyle">
                    <div :style="cell.style" @click="onCell(cell.evtType, cellIdx, rowIdx)">
                        <slot :name="cellIdx" :cell="cell">{{ cell.text }}</slot>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
table {
    border-spacing: 0;
}

th,
td {
    border: thin solid;
}

th:nth-of-type(2n),
td:nth-of-type(2n) {
    border-left: none;
    border-right: none;
}

th:last-of-type,
td:last-of-type {
    border-right: thin solid;
}

td {
    border-top: none;
}

th > div,
td > div {
    display: flex;
    align-items: center;
    justify-content: center;
}

.arrow_direction_up {
    transform: rotate(-90deg);
}

.arrow_direction_down {
    transform: rotate(90deg);
}
</style>
