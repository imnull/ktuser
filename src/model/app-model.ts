import { query } from "libs/mysql";
import { TAppModel } from "./type";

export default class AppModel {

    static get(appType: number) {
        return query<TAppModel>('SELECT * FROM config_appmodel WHERE status>=0 AND apptype=?', [appType])
    }

    static async getModel(appType: number, propName: string): Promise<TAppModel | null> {
        const [row] = await query<TAppModel>('SELECT * FROM config_appmodel WHERE status>=0 AND apptype=? AND prop_name=?', [appType, propName])
        return row || null
    }
}