const { Router } = require('express')
const booksRouter = require('../../modules/boooks/infra/http/routes/book.routes')

const router = Router()

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'SUPERO',
    total: '',
    busca: '',
    anoInicial: '',
    anoFinal: '',
    paginationQuantity: Math.round(994 / 10),
    initPagination: 1,
    finishPagination: 8,
    skipCount: 1,
    books: []
  })
})

router.use('/books', booksRouter)

module.exports = router
