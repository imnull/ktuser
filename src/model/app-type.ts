import { query, execute, executeTrans } from 'libs/mysql'
import { TInsertResponse, TAppType } from './type'
import { App } from './index'

export default class AppType {

    static parse(row: TAppType) {
        const appType = new AppType()
        appType.id = row.id
        appType.name = row.typename
        appType.status = row.status
        appType.description = row.description
        return appType
    }

    static write(row: TAppType, appType: AppType) {
        appType.id = row.id
        appType.name = row.typename
        appType.status = row.status
        appType.description = row.description
    }

    static async list() {
        const list = await query<TAppType>('SELECT * FROM config_apptype WHERE status>=0;')
        return list
    }

    static async get(type: string): Promise<TAppType | null> {
        const [row] = await query<TAppType>('SELECT * FROM config_apptype WHERE status>=0 AND typename=?;', [type])
        if (!row) {
            return null
        }
        return row
    }

    static async getByID(id: number): Promise<TAppType | null> {
        const [row] = await query<TAppType>('SELECT * FROM config_apptype WHERE status>=0 AND id=?;', [id])
        return row || null
    }

    static async exists(type: string) {
        const res = await query<{ id: number }>('SELECT id FROM config_apptype WHERE typename=?;', [type])
        return res.length > 0 ? res[0].id : 0
    }

    static async getAllTypes() {
        const list = await query<TAppType>('SELECT * FROM config_apptype WHERE status>=0;')
        return list.map(({ typename }) => typename)
    }

    static async add(type: string, desc: string, status: number = 0) {
        const exists = await AppType.exists(type)
        if (exists) {
            return false
        }
        const sql = 'INSERT INTO config_apptype(typename,description,status)VALUES(?,?,?);'
        const { affectedRows, insertId } = await executeTrans<TInsertResponse>(sql, [type, desc, status])
        if (affectedRows > 0 && insertId > 0) {
            return {
                id: insertId,
                typename: type,
                description: desc,
                status: status,
            } as TAppType
        } else {
            return false
        }
    }

    static async load(key: number | string) {
        const appType = new AppType()
        await appType.load(key)
        return appType
    }

    private id: number = 0
    private name: string = ''
    private description: string = ''
    private status: number = 0

    get() {
        return { id: this.id, name: this.name, description: this.description, status: this.status }
    }
    getRow() {
        return {
            id: this.id,
            typename: this.name,
            description: this.description,
            status: this.status,
        } as TAppType
    }

    read(row: TAppType) {
        AppType.write(row, this)
    }

    isValid() {
        return this.id > 0
    }

    async load(key: number | string) {
        let row: TAppType | null = null
        if(typeof key === 'number') {
            row = await AppType.getByID(key)
        } else if(typeof key === 'string') {
            row = await AppType.get(key)
        }
        if(!row) {
            throw `Invalid AppType key: [${key}]`
        }
        this.read(row)
    }
}