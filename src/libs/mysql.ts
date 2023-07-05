import mysql from 'mysql2'
import { KTUserConfig } from './env-conf'

const createPool = () => {
    const ktuser = new KTUserConfig()
    const config = ktuser.get()
    const pool = mysql.createPool({
        host: config.mysql_hostname,
        user: config.mysql_username,
        password: config.mysql_password,
        database: config.mysql_database,
    })
    return pool
}

const POOL = createPool()


export const query = <T extends Record<string, any> = Record<string, any>>(sql: string, values: any[] = []) => new Promise<T[]>((resolve, reject) => {
    POOL.getConnection((err, conn) => {
        if(err) {
            conn.destroy()
            reject(err)
        } else {
            conn.query({
                sql,
                values,
                rowsAsArray: false,
            }, (err, res: T[]) => {
                conn.destroy()
                if(err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        }
    })
})

query<{ id: number; typename: string; description: string; status: number; }>(`SELECT * FROM config_apptype`).then(res => {
    console.log(res)
})