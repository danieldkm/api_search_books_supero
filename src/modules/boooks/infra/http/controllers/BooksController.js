const ListBooksServices = require('../../../services/ListBooksServices')
const UpdateBooksService = require('../../../services/UpdateBooksService')

const listBooksServices = new ListBooksServices()
const updateBooksService = new UpdateBooksService()

function foundPaginationRange (paginationActive, maxResultCount) {
  let notFound = true
  let initial = 1
  let finish = 8
  if (!paginationActive) {
    return {
      initial, finish
    }
  }
  while (notFound) {
    if (paginationActive >= initial && paginationActive <= finish) {
      notFound = false
    } else {
      initial = JSON.parse(JSON.stringify(finish)) + 1
      finish += 8
    }
  }
  return {
    initial, finish
  }
}

class BooksController {
  async show (request, response) {
    try {
      const { busca, anoInicial, anoFinal, sorting, maxResultCount, skipCount } = request.query
      console.log({ busca, anoInicial, anoFinal, sorting, maxResultCount, skipCount })
      let skipCountWork = skipCount
      if (skipCount.includes('proximo')) {
        skipCountWork = parseInt(skipCount.replace('proximo', '')) + 1
      }

      if (skipCount.includes('anterior')) {
        skipCountWork = parseInt(skipCount.replace('anterior', '')) - 1
      }

      // console.log('skipCountWork', skipCountWork, skipCount)

      const { initial, finish } = foundPaginationRange(parseInt(skipCountWork), parseInt(maxResultCount))

      // console.log(' { initial, finish }', { initial, finish })
      const anoIni = anoInicial ? parseInt(anoInicial) : ''
      const anoFin = anoFinal ? parseInt(anoFinal) : ''
      const books = await listBooksServices.execute(busca, anoIni, anoFin, sorting, maxResultCount, parseInt(skipCountWork))

      const returnValues = {
        busca,
        anoInicial,
        anoFinal,
        sorting,
        maxResultCount,
        skipCount,
        title: 'SUPERO',
        total: books.totalCount,
        initPagination: initial,
        finishPagination: finish,
        books: books.items
      }
      return response.render('index', returnValues)
    } catch (error) {
      console.log(error)
      response.locals.message = error.message
      response.locals.error = error
      return response.render('error')
    }
  }

  async update (request, response) {
    console.log('body', request.body)
    const { titulo, isbn, autor, editora, ano } = request.body
    const { bookId } = request.params
    await updateBooksService.execute({ id: bookId, titulo, isbn, autor, editora, ano: parseInt(ano) })
  }
}

module.exports = BooksController
