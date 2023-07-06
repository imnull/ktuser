import { execute, executeTrans, query } from "libs/mysql"
import { TAppModel, TAppProp, TAppType, TAppBase } from './type'
import { AppType, AppModel, AppProps } from './index'

export default class App {
    static async list() {
        const list = await query<TAppBase>('SELECT * FROM config_applist WHERE app_status>=0;')
        return list
    }

    static async get(id: number): Promise<TAppBase | null> {
        const [row] = await query<TAppBase & { typename: string }>(
            'SELECT * FROM config_applist WHERE app_status>=0 AND id=?', [id])
        return row || null
    }

    static async load(id: number) {

        const [row] = await query<{
            app_id: number;
            app_name: string;
            app_status: number;
            type_id: number;
            type_name: string;
            type_desc: string;
            type_status: number;
        }>(
            "SELECT "
            + "t1.id app_id,t1.app_name,t1.app_status,t2.id type_id,t2.typename type_name,t2.description type_desc,t2.status type_status"
            + " FROM ("
            + "SELECT * FROM config_applist WHERE app_status>=0 AND id=?"
            + ") t1 LEFT JOIN ("
            + "SELECT * FROM config_apptype WHERE status>=0"
            + ") t2 ON t2.id = t1.app_type",
            [id]
        )

        if (!row) {
            throw `Invalid appId: [${id}]`
        }
        if (!row.type_id) {
            throw `Invalid app_type: [${row.type_id}]`
        }

        const app = new App({
            id: row.app_id,
            app_type: row.type_id,
            app_name: row.app_name,
            app_status: row.app_status
        }, {
            id: row.type_id,
            typename: row.type_name,
            description: row.type_desc,
            status: row.type_status,
        })
        return app
    }

    private readonly type: TAppType
    private readonly base: TAppBase

    constructor(base: TAppBase, type: TAppType) {
        this.base = base
        this.type = type
    }

    getAppId() {
        return this.base.id
    }

    getAppName() {
        return this.base.app_name
    }
    getAppType() {
        return this.base.app_type
    }
    getAppTypeName() {
        return this.type.typename
    }

    async getProps<T extends Record<string, any> = Record<string, string>>() {
        const rows = await this.getProperties()
        return rows.map(({ model_name, prop_value }) => ({ [model_name]: prop_value || '' })).reduce((r, v) => ({ ...r, ...v }), {}) as T
    }

    async getProperties() {
        const sql = "SELECT "
            + "t2.appid app_id,t1.apptype app_type,t1.id model_id,t1.prop_name model_name,t1.prop_desc model_desc,t2.id prop_id,t2.value prop_value"
            + " FROM ("
            + "SELECT * FROM config_appmodel WHERE apptype=?"
            + ") t1 LEFT JOIN ("
            + "SELECT * FROM config_appprops WHERE appid=?"
            + ") t2 ON t2.propid=t1.id"
        const rows = await query<{
            app_id: number;
            app_type: number;
            model_id: number;
            model_name: string;
            model_desc: string;
            prop_id: number;
            prop_value: string;
        }>(sql, [this.getAppType(), this.getAppId()])
        return rows
    }

    async setProperty(name: string, value: string) {
        const props = await this.getProperties()
        const prop = props.find(m => m.model_name === name)
        if (!prop) {
            throw `Invalid app property: [${name}]. The valid properties is: ${props.length > 0 ? props.map(m => `[${m.model_name}]`).join(',') : '[]'}`
        }
        await AppProps.save(this.getAppId(), prop.model_id, value)
    }

    async changeType(type: string) {
        if (type === this.getAppTypeName()) {
            return
        }
        const typeid = await AppType.exists(type)
        if (!typeid) {
            throw `Invalid typename: [${type}]`
        }
        await executeTrans('UPDATE config_applist SET app_type=? WHERE id=?', [typeid, this.getAppId()])
    }
}