const api = require('../../../services/api')
class ListBooksServices {
  async execute (busca, anoInicial, anoFinal, sorting, maxResultCount = 10, skipCount = 0) {
    if (!skipCount && skipCount !== 0) {
      skipCount = 0
    }
    if (skipCount > 1) {
      skipCount = maxResultCount * skipCount
    }
    const { data } = await api.get('Livros', {
      params: {
        busca,
        anoInicial,
        anoFinal,
        sorting,
        maxResultCount,
        skipCount: skipCount === 1 ? 0 : skipCount
      }
    })
    return data
  }
}

module.exports = ListBooksServices
