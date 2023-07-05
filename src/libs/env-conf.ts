import process from 'process'
import os from 'os'
import path from 'path'
import fs from 'fs'
import yaml from 'yaml'

const getEnvValue = (name: string) => {
    return process.env[name]
}

const getRcPath = (name: string) => {
    return path.join(os.homedir(), name)
}

const isNil = (v: any) => v === '' || (typeof v === 'number' && isNaN(v)) || typeof v === 'undefined' || v === null
const isValid = (v: any): v is string => v && typeof v === 'string'

type TA = { a: string; b: string }
type TAKey = keyof TA

let a: TAKey[] = ['a', 'b']

export class GlobalConfig<T extends Record<string, string>> {
    private readonly config: T
    private readonly name: string
    private readonly keys: (keyof T)[]
    constructor(name: string, config: T) {
        this.name = name
        this.config = config
        this.keys = Object.keys(config)
    }

    protected getEnv() {
        const o: any = {}
        this.keys.forEach(key => {
            const val = getEnvValue(this.config[key])
            if (isValid(val)) {
                o[key] = val
            }
        })
        return o
    }

    protected getRcName() {
        return `.${this.name}`
    }

    protected getRc() {
        const rcfile = getRcPath(this.getRcName())
        if (fs.existsSync(rcfile)) {
            const yml = fs.readFileSync(rcfile, 'utf-8')
            try {
                return yaml.parse(yml)
            } catch (ex) {
                return {}
            }
        }
        return {}
    }

    get() {
        const o: any = {}
        const rc = this.getRc()
        const ev = this.getEnv()
        this.keys.forEach(key => {
            o[key] = [ev[key], rc[key]].reduce((r, v) => isValid(v) ? v : r, '')
        })
        return o as T
    }

    save() {
        const yml = yaml.stringify(this.get())
        const rcfile = getRcPath(this.getRcName())
        fs.writeFileSync(rcfile, yml)
    }
}

export class KTUserConfig extends GlobalConfig<{
    mysql_hostname: string;
    mysql_username: string;
    mysql_password: string;
    mysql_database: string;
}> {
    constructor() {
        super('ktuser', {
            mysql_hostname: 'KTUSER_MYSQL_HOSTNAME',
            mysql_username: 'KTUSER_MYSQL_USERNAME',
            mysql_password: 'KTUSER_MYSQL_PASSWORD',
            mysql_database: 'KTUSER_MYSQL_DATABASE',
        })
    }
}

export class KTShopConfig extends GlobalConfig<{
    mysql_host: string;
    mysql_database: string;
    mysql_user: string;
    mysql_password: string;
    redis_host: string;
    redis_password: string;
    login_token_expired: string;
    oss_region: string;
    oss_id: string;
    oss_secret: string;
    oss_bucket: string;
    oss_prefix: string;
    oss_host: string;
}> {
    constructor() {
        super('ktshop', {
            mysql_host: 'KTSHOP_MYSQL_HOST',
            mysql_database: 'KTSHOP_MYSQL_DATABASE',
            mysql_user: 'KTSHOP_MYSQL_USER',
            mysql_password: 'KTSHOP_MYSQL_PASSWORD',
            redis_host: 'KTSHOP_REDIS_HOST',
            redis_password: 'KTSHOP_REDIS_PASSWORD',
            login_token_expired: 'KTSHOP_LOGIN_TOKEN_EXPIRED',
            oss_region: 'KTSHOP_OSS_REGION',
            oss_id: 'KTSHOP_OSS_ID',
            oss_secret: 'KTSHOP_OSS_SECRET',
            oss_bucket: 'KTSHOP_OSS_BUCKET',
            oss_prefix: 'KTSHOP_OSS_PREFIX',
            oss_host: 'KTSHOP_OSS_HOST',
        })
    }
}
