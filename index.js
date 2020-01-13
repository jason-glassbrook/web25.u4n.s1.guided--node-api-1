/// external modules ///
// import express from 'express' // ES2015 modules
const express = require ('express') // CommonJS modules

/// server ///
const port = 5555
const server = express ()

/***************************************
  define requests
***************************************/

const routes = {
  root : '/',
  home : '/api',
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

})
/***************************************
  run server
***************************************/

server.listen (port, () => {
  console.log (`it's alive!`)
  console.log (`\n>>> listening on port ${port} <<<\n`)
})
