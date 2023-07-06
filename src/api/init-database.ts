import { createConn, executeTrans } from '../libs/mysql'
import { KTUserConfig } from '../libs/env-conf'
import {
    CREATE_DATABASE,
    CREATE_TABLES,
} from './sql'

export const createTables = async () => {
    for(let i = 0; i < CREATE_TABLES.length; i++) {
        const sql = CREATE_TABLES[i]
        try {
            await executeTrans(sql)
            console.log('done ---->', sql)
        } catch(ex) {
            console.log('error --->', ex)
        }
    }
}