interface ITableData {
    text: string
}

/**
 * @description
 * Интерфейс, представляющий заголовок таблицы.
 */
export interface IHeader extends ITableData {
    useSort: boolean
}

/**
 * @description
 * Интерфейс, представляющий ячейку таблицы.
 */
export interface ICell extends ITableData {
    evtType?: string
    style?: Record<string, string>
}

/**
 * @description
 * Интерфейс, представляющий полезную нагрузку события **cell**.
 */
export interface IOnCellEvent {
    event: 'remove'
    cell: number
    row: number
}

/**
 * @description
 * Интерфейс, представляющий информацию о режиме сортировки колонки таблицы.
 */
export interface ISortedColumn {
    cell: number
    mode: 'ascending' | 'descending'
}
