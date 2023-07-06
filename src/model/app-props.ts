import { executeTrans, query } from "libs/mysql";
import { TAppProp, TInsertResponse } from "./type";

export default class AppProps {

    static get(appid: number) {
        return query<TAppProp>('SELECT * FROM config_appprops WHERE appid=?', [appid])
    }

    static async getId(appid: number, modelid: number) {
        const [row] = await query<{ id: number }>('SELECT id FROM config_appprops WHERE appid=? AND propid=?', [appid, modelid])
        return row ? row.id : null
    }

    static async save(appid: number, modelid: number, value: string) {
        const id = await AppProps.getId(appid, modelid)
        if(!id) {
            const { insertId } = await executeTrans<TInsertResponse>('INSERT INTO config_appprops(appid, propid, value)VALUES(?,?,?)', [appid, modelid, value])
            return insertId
        } else {
            await executeTrans('UPDATE config_appprops SET value=? WHERE id=?', [value, id])
            return id
        }
    }
}