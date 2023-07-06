import { query } from 'libs/mysql'

import {
    APP_TYPE_LIST,
    APP_TYPE_GET_ID,
} from './sql'

export const apptypeGetList = async () => {
    const res = await query<{ id: number; typename: string; description: string; status: number; }>(APP_TYPE_LIST)
    return res
}

export const apptypeGetID = async (typeName: string) => {
    const [row = []] = await query(APP_TYPE_GET_ID, [typeName], true)
    return (Array.isArray(row) ? row[0] || 0 : 0) as number
}

export * from './init-database'