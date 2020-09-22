const { Router } = require('express')
const BooksController = require('../controllers/BooksController')
const { celebrate, Segments, Joi } = require('celebrate')

const bookRouter = Router()
const booksController = new BooksController()

bookRouter.get('/', booksController.show)
bookRouter.put('/:bookId', celebrate({
  [Segments.BODY]: Joi.object().keys({
    titulo: Joi.string().required(),
    isbn: Joi.string().required(),
    autor: Joi.string().required(),
    editora: Joi.string().required(),
    ano: Joi.number().required()
  })
}), booksController.update)

module.exports = bookRouter
