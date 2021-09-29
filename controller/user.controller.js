
const User = require("../models/user.model")

// async function controller (fastify, options) {
//     fastify.get('/', async (request, reply) => {
//       return { hello: 'Everyone' }
//     })
//   }
// get all user
module.exports = {
    create: async function (req, reply) {
      try {
        const user = req.body
        const newUser = await User.create(user)
  
        reply.code(201).send(newUser)
      } catch (err) {
        req.log.error(err)
        reply.code(500).send(err)
      }
    },
  
    getAll: async function (req, reply) {
      try {
        let filter = { where: {}, sort: '', skip: 0, limit: 10 }
  
        if (req.query.filter) {
          try {
            filter = JSON.parse(req.query.filter)
            filter.sort = makeMongooseSort(filter.order)
  
            for (const prop in filter.where) {
              if (typeof filter.where[prop] == 'string') {
                filter.where[prop] = { $regex: filter.where[prop] }
              }
            }
          } catch (err) {
            req.log.error(err)
          }
        }
  
        if (!filter.where) filter.where = {}
        if (!filter.skip) filter.skip = 0
  
        if (
          typeof filter.limt != 'number' ||
          (filter.limit <= 0 && filter.limit >= 50)
        ) {
          filter.limit = 10
        }
  
        const user = await User.find(filter.where)
          .sort(filter.sort)
          .skip(filter.skip)
          .limit(filter.limit)
  
        const count = await User.countDocuments(filter.where).then()
  
        reply.code(200).send({ count: count, "User": user })
      } catch (err) {
        req.log.error(err)
        reply.code(500).send(err)
      }
    },
  
    getOne: async function (req, reply) {
      try {
        const _id = req.params.id
        const user = await User.findById(_id)
  
        reply.code(200).send({ "User": user })
      } catch (err) {
        req.log.error(err)
        reply.code(500).send(err)
      }
    },
  
    putOne: async function (req, reply) {
      try {
        const _id = req.params.id
        const updates = req.body
        const user = await User.findOneAndReplace({ _id: _id }, updates, {
          new: true,
        })
  
        reply.code(200).send({ "User": user })
      } catch (err) {
        req.log.error(err)
        reply.code(500).send(err)
      }
    },
  
    patchOne: async function (req, reply) {
      try {
        const _id = req.params.id
        const updates = req.body
        const user = await User.findByIdAndUpdate(
          _id,
          { $set: updates },
          { new: true },
        )
  
        reply.code(200).send({ "User": user })
      } catch (err) {
        req.log.error(err)
        reply.code(500).send(err)
      }
    },
  
    deleteOne: async function (req, reply) {
      try {
        const _id = req.params.id
        const user = await User.findByIdAndRemove(_id)
        reply.code(200).send({ "message": "user deleted" })
      } catch (err) {
        req.log.error(err)
        reply.code(500).send(err)
      }
    },
  }
//   module.exports = controller
