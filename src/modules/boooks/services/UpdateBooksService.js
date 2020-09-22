const api = require('../../../services/api')

class UpdateBooksService {
  async execute (book) {
    const { data } = await api.put(`Livros/${book.id}`, book)
    return data
  }
}

module.exports = UpdateBooksService
