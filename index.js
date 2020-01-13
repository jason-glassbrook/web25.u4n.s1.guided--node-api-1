/// external modules ///
// import express from 'express' // ES2015 modules
const express = require ('express') // CommonJS modules

/// database ///
const hubs = require ('./data/hubs-model.js')

/// server ///
const port = 5555
const server = express ()

/***************************************
  define requests
***************************************/

const routes = {
  root : '/',
  home : '/api',
  hubs : '/api/hubs',
}

/*******************
  root
*******************/

/// get ///
server.get (routes.root, (dn, up) => {
  console.log (`>>> root .get <<<`)
  up.json ({
    message : 'hello world',
  })
})

/*******************
  hubs
*******************/

/// create ///


/// read ///
server.get (routes.hubs, (dn, up) => {
  console.log (`>>> hubs .get <<<`)
  hubs
    .find () // returns a promise
    .then ((data) => {
      console.log (`>>> hubs .get .find .then <<<`)
      up
        .status (200)
        .json (data)
    })
    .catch ((error) => {
      console.log (`>>> get hubs .get .find .catch <<<`)
      console.log (error)
      up
        .status (500)
        .json ({
          error : `sorry, we ran into an error when getting hubs`,
        })
    })
})

/// update ///


/// delete ///


/***************************************
  run server
***************************************/

server.listen (port, () => {
  console.log (`it's alive!`)
  console.log (`\n>>> listening on port ${port} <<<\n`)
})
