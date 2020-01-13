/// external modules ///
// import express from 'express' // ES2015 modules
const express = require ('express') // CommonJS modules

/// database ///
const hubsDB = require ('./data/hubs-model.js')

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
  hubs : {
    POST   : () => `/api/hubs`,
    GET    : () => `/api/hubs`,
    PUT    : (id) => `/api/hubs/${id}`,
    DELETE : (id) => `/api/hubs/${id}`,
  },
}

/*******************
  root
*******************/

/// get ///
server.get (routes.root, (ri, ro) => {
  console.log (`>>> root .get <<<`)
  ro
    .json ({
      message : 'hello world',
    })
})

/*******************
  hubs
*******************/

/// create ///
server.post (routes.hubs.POST (), (ri, ro) => {
  console.log (`>>> hubs .post <<<`)
  const hubData = ri.body
  // for now, we will trust the data
  // ...but in practice, we would validate it
  hubsDB
    .add (hubData)
    .then ((createdHub) => {
      console.log (`>>> hubs .post .add .then <<<`)
      ro
        .status (201)
        .json (createdHub)
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
server.get (routes.hubs.GET (), (ri, ro) => {
  console.log (`>>> hubs .get <<<`)
  hubsDB
    .find () // returns a promise
    .then ((foundHubs) => {
      console.log (`>>> hubs .get .find .then <<<`)
      ro
        .status (200)
        .json (foundHubs)
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
server.delete (routes.hubs.DELETE (':id'), (ri, ro) => {
  console.log (`>>> hubs .delete <<<`)
  const hubId = ri.params.id

  hubsDB
    .remove (hubId)
    .then ((deletedHub) => {
      console.log (`>>> hubs .delete .remove .then <<<`)
      ro
        .status (201)
        .json (deletedHub)
    })
    .catch ((error) => {
      console.log (`>>> hubs .delete .remove .catch <<<`)
      console.log (error)
      ro
        .status (500)
        .json ({
          error : `sorry, we ran into an error when posting hubs`,
        })
    })
})

/***************************************
  run server
***************************************/

server.listen (port, () => {
  console.log (`it's alive!`)
  console.log (`\n>>> listening on port ${port} <<<\n`)
})
