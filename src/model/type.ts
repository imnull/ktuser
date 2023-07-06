export type TInsertResponse = {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    info: string;
    serverStatus: number;
    warningStatus: number;
}

export type TAppType = {
    id: number;
    typename: string;
    description: string;
    status: number;
}

export type TAppModel = {
    id: number;
    apptype: number;
    prop_name: string;
    prop_desc: string;
}

export type TAppProp = {
    id: number;
    appid: number;
    propid: number;
    value: string;
}

export type TAppBase = {
    id: number,
    app_type: number,
    app_status: number,
    app_name: string,
}
