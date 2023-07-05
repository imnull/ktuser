export const APP_TYPE_LIST = `SELECT * FROM config_apptype;`
export const APP_TYPE_GET_ID = `SELECT id FROM config_apptype WHERE status>=0 AND typename=?;`