// import express from 'express'
const express = require ('express')

const port = 5555
const server = express ()

server.get ('/', (request, response) => {

})

server.listen (port, () => {
  console.log (`it's alive!`)
  console.log (`\n>>> listening on port ${port} <<<\n`)
})
