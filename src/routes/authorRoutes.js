const authorController = require('../controllers/authorController')
module.exports = (app, router) => {

    router.post('/', authorController.create)
    router.get('/', authorController.browse)
    //----------------------------------------------------
    router.get('/:id', authorController.view)
    router.put('/:id', authorController.update)
    router.delete('/:id', authorController.delete)
    //----------------------------------------------------
    router.post('/:id/activate', authorController.activate)

    app.use('/api/json/authors', router)
}