import { apptypeGetList, apptypeGetID, createTables } from 'api'
import { AppType, App } from 'model'


// createTables().then(() => {
//     console.log(1)
// })


// apptypeGetList().then(console.log)

// apptypeGetID('wx').then(console.log)

// AppType.list().then(console.log)
// AppType.get('wx').then(console.log)
// AppType.get('ali').then(console.log)
// AppType.get('swan').then(console.log)
// AppType.typeExists('wx').then(console.log)
// AppType.typeExists('wx2').then(console.log)
// AppType.add('wx4', '测试唯一列冲突', 2).then(console.log)
// AppType.getAllTypes().then(console.log)

// App.list().then(console.log)
// App.get(1).then(console.log)

// AppType.load('wx').then(async appType => {
//     const app = appType.createApp()
//     app.name = '测试一下啊222'
//     await app.save()
//     console.log(app)
// })

// App.load(4).then(async app => {
//     await app.setType('tt')
//     app.name = '测试444455555'
//     await app.save()
//     console.log(app)
//     console.log(await app.getType())
// })

// App.load(2).then(async app => {
//     await app.setType('tt')
//     app.name = '测试444455555'
//     await app.save()
//     console.log(app)
//     console.log(await app.getType())
// })

// App.load(3).then(async app => {
//     const model = await app.getModel()
//     console.log(model)
//     const props = await app.getProps()
//     console.log(props)
// })

// App.load(1).then(async app => {
//     const model = await app.getModel()
//     console.log(model)
//     const props = await app.getProps()
//     console.log(props)
// })

App.load(2).then(async app => {
    // console.log(app)
    console.log(await app.getProps())
    await app.setProperty('appid', Date.now().toString())
    await app.setProperty('appsecret', (new Date()).toString())
    console.log(await app.getProperties())
})

// App.load(4).then(async app => {
//     await app.setProperty('appid', Date.now().toString())
//     await app.setProperty('appsecret', (new Date()).toString())
//     console.log(await app.getProps())
// })