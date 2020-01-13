/// external modules ///
// import express from 'express' // ES2015 modules
const express = require ('express') // CommonJS modules

/// database ///
const hubs = require ('./data/hubs-model.js')

/// server ///
const port = 5555
const server = express ()
server.use (express.json ())

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
server.get (routes.root, (ri, ro) => {
  console.log (`>>> root .get <<<`)
  ro.json ({
    message : 'hello world',
  })
})

/*******************
  hubs
*******************/

/// create ///
server.post (routes.hubs, (ri, ro) => {
  console.log (`>>> hubs .post <<<`)
  const hubData = ri.body
  // for now, we will trust the data
  // ...but in practice, we would validate it
  hubs
    .add (hubData)
    .then ((data) => {
      console.log (`>>> hubs .post .add .then <<<`)
      ro
        .status (201)
        .json (data)
    })
    .catch ((error) => {
      console.log (`>>> hubs .post .add .catch <<<`)
      console.log (error)
      ro
        .status (500)
        .json ({
          error : `sorry, we ran into an error when posting hubs`,
        })
    })
})

/// read ///
server.get (routes.hubs, (dn, ro) => {
  console.log (`>>> hubs .get <<<`)
  hubs
    .find () // returns a promise
    .then ((data) => {
      console.log (`>>> hubs .get .find .then <<<`)
      ro
        .status (200)
        .json (data)
    })
    .catch ((error) => {
      console.log (`>>> hubs .get .find .catch <<<`)
      console.log (error)
      ro
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
