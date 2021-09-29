
const userController = require('../../controller/user.controller');

const userSchema = {
    name : {type : 'string'},
    email : {type : 'string'},
    phone : {type : 'string'},
    gender : {type : 'string'},
}

const userResponse = {
 
  properties : {
    _id : {type : 'string'},
    name : {type : 'string'},
    email : {type : 'string'},
    phone : {type : 'string'},
    gender : {type : 'string'},
    createdAt: {type: 'string'},
    updatedAt: {type: 'string'}
  }
}

const userErrorResponse = {
  "statusCode":  {type : 'integer'},
  "error": {type: 'string'},
  "message": {type: 'string'}
}

const routes = [{
    method: 'GET',
    url: '/api/user',
    handler: userController.getAll
},
{
    method: 'GET',
    url: '/api/user/:id',
    handler: userController.getOne
},
{
    method: 'POST',
    url: '/api/user/',
    handler: userController.create
},
{
    method: 'PATCH',
    url: '/api/user/:id',
    handler: userController.patchOne
},
{
    method: 'DELETE',
    url: '/api/user/:id',
    handler: userController.deleteOne
}
]

  
module.exports = async function(fastify,opts){

    fastify.post("/", userController.create);
  
    fastify.get("/:id", userController.getOne);
  
    fastify.get("/", userController.getAll);
  
    fastify.put("/:id",userController.putOne);
  
    fastify.patch("/:id",userController.patchOne);
  
    fastify.delete("/:id", userController.deleteOne);
  }
  