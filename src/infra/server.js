const cors = require('cors')
const express = require('express')
const { errors } = require('celebrate')
const path = require('path')
const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const routes = require('./routes')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, '..', 'pages'))
app.set('view engine', 'ejs')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(errors())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '..', 'pages', 'public')))

app.use(routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(3333, () => {
  console.log('Server stared on port 3333!')
})
