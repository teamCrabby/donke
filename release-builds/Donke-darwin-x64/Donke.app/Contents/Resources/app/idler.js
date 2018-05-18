const {getIdleTime} = require('desktop-idle')
const {EventEmitter} = require('events')

const idler = module.exports = new EventEmitter

setInterval(function () {
  idler.emit('update', getIdleTime())
}, 1000);