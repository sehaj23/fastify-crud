'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const mongoose = require('mongoose')

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  fastify.addHook('onClose', (instance, done) => {
    // Some code
    console.log('onClose')
    mongoose.connection.close(false, () => {
      console.log('MongoDb connection closed.')
    })
    done()
  })

  fastify.register(require('fastify-swagger'), {
    swagger: {
      info: {
        title: 'Test swagger',
        description: 'testing the fastify swagger api',
        version: '0.1.0',
      },
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header',
        },
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [{ name: 'user', description: 'user related end points' }],
    },
    hideUntagged: false,
    exposeRoute: true,
  })

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts),
  })
}
