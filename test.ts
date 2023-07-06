import { apptypeGetList, apptypeGetID } from './src/api'
import { createTables } from './src/api/init-database'


createTables().then(() => {
    console.log(1)
})

// initDatabase(sql).then(console.log)

// apptypeGetList().then(console.log)

// apptypeGetID('wx').then(console.log)