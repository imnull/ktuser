import mysql from 'mysql2'
import { KTUserConfig } from './env-conf'

export const createConn = (useDb: boolean = true) => {
    const ktuser = new KTUserConfig()
    const config = ktuser.get()
    const params: any = {
        host: config.mysql_hostname,
        user: config.mysql_username,
        password: config.mysql_password,
    }
    if(useDb) {
        params.database = config.mysql_database
    }
    const conn = mysql.createConnection(params)
    return conn
}

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

export const query = <T extends Record<string, any> = Record<string, any>>(sql: string, values: any[] = [], asArray: boolean = false) => new Promise<T[]>((resolve, reject) => {
    POOL.getConnection((err, conn) => {
        if(err) {
            reject(err)
        } else {
            conn.query({
                sql,
                values,
                rowsAsArray: asArray,
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

export const execute = <T extends Record<string, any> = Record<string, any>>(sql: string, values: any[] = [], asArray: boolean = false) => new Promise<T[]>((resolve, reject) => {
    POOL.getConnection((err, conn) => {
        if(err) {
            reject(err)
        } else {
            conn.execute({
                sql,
                values,
                rowsAsArray: asArray,
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

export const executeTrans = <T extends Record<string, any> = Record<string, any>>(sql: string, values: any[] = [], asArray: boolean = false) => new Promise<T[]>((resolve, reject) => {
    POOL.getConnection((err, conn) => {
        if(err) {
            reject(err)
        } else {
            conn.beginTransaction(err => {
                if(err) {
                    reject(err)
                } else {
                    conn.execute({
                        sql,
                        values,
                        rowsAsArray: asArray,
                    }, (err, res: T[]) => {
                        if(err) {
                            conn.rollback(() => {
                                conn.destroy()
                                reject(err)
                            })
                        } else {
                            conn.commit(err => {
                                conn.destroy()
                                if(err) {
                                    reject(err)
                                } else {
                                    resolve(res)
                                }
                            })
                        }
                    })
                }
            })
            
        }
    })
})
