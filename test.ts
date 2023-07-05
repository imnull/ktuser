import { apptypeGetList, apptypeGetID } from './src/api'

apptypeGetList().then(console.log)

apptypeGetID('wx').then(console.log)