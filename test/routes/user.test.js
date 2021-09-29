'use strict'

const { test } = require('tap')
const { build } = require('../helper')
const faker = require('faker')

test('/user POST Route', async (t) => {
    let userId
  const app = build(t)
     t.plan(3)

  t.test('when sending empty object, return fail response', async (t) => {
    t.plan(3)
    const response = await app.inject({
      url: '/user',
      method: 'POST',
      payload: {},
    })

    t.equal(response.statusCode, 500)
    t.equal(response.headers['content-type'], 'application/json; charset=utf-8')
    t.same(response.json(), {
      statusCode: 500,
      error: 'Internal Server Error',
      message: "users validation failed: email: Path `email` is required., name: Path `name` is required."
    })
    t.end()
  })

  t.test('when sending all fields, return success response', async (t) => {
    t.plan(3)
    const response = await app.inject({
      url: '/user',
      method: 'POST',
      payload: {
        name: faker.name.findName(),
        phone:faker.phone.phoneNumber(),
        gender:"male",
        email: faker.internet.email()
      },
    })

    t.equal(response.statusCode, 201)
    t.equal(response.headers['content-type'], 'application/json; charset=utf-8')
    // t.has(response.json(), {
     
    //     name: 'sehaj',
    //     phone:"9711841198",
    //     gender:"male",
    //     email:"seha@gmail.com"
      
    // })
    t.end()
  })
  t.end()
  //   app.close()
})

test('/user GET Route', async (t) => {
    const app = build(t)
       t.plan(3)
  
  
    t.test('get all users', async (t) => {
      t.plan(3)
      const response = await app.inject({
        url: '/user',
        method: 'GET',
        payload: {
          
        },
      })
  
     t.equal(response.statusCode, 200)
      t.equal(response.headers['content-type'], 'application/json; charset=utf-8')
  
      t.end()
    })
    t.end()
    //    app.close()

    test('/GET user by id', async (t) => {
        const app = build(t)
           t.plan(3)
     
        t.test('add user', async (t) => {
          t.plan(3)
          const response = await app.inject({
            url: '/user',
            method: 'POST',
            payload: {
              name: faker.name.findName(),
              phone:faker.phone.phoneNumber(),
              gender:"male",
              email: faker.internet.email()
            },
          })
          const data =  JSON.parse(response.body)
          const userId =  data._id
          const response1 = await app.inject({
            url: `/user/${userId}`,
            method: 'GET',
            payload: {
              
            },
          })
      
         t.equal(response1.statusCode, 200)
          t.equal(response1.headers['content-type'], 'application/json; charset=utf-8')
      
          t.end()
        })
        t.end()
    
  })


  test('/delete user', async (t) => {
    const app = build(t)
       t.plan(3)
 
    t.test('Add user', async (t) => {
      t.plan(3)
      const response = await app.inject({
        url: '/user',
        method: 'POST',
        payload: {
          name: faker.name.findName(),
          phone:faker.phone.phoneNumber(),
          gender:"male",
          email: faker.internet.email()
        },
      })
      const data =  JSON.parse(response.body)
      const userId =  data._id
      const response1 = await app.inject({
        url: `/user/${userId}`,
        method: 'DELETE',
        payload: {
          
        },
      })
  
     t.equal(response1.statusCode, 200)
      t.equal(response1.headers['content-type'], 'application/json; charset=utf-8')
  
      t.end()
    })
    t.end()

})


test('/Update user', async (t) => {
    const app = build(t)
       t.plan(3)
 
    t.test('get all users', async (t) => {
      t.plan(3)
      const response = await app.inject({
        url: '/user',
        method: 'POST',
        payload: {
          name: faker.name.findName(),
          phone:faker.phone.phoneNumber(),
          gender:"male",
          email: faker.internet.email()
        },
      })
      const data =  JSON.parse(response.body)
      const userId =  data._id
      const response1 = await app.inject({
        url: `/user/${userId}`,
        method: 'PATCH',
        payload: {
          name:faker.name.findName()
        },
      })
  
     t.equal(response1.statusCode, 200)
      t.equal(response1.headers['content-type'], 'application/json; charset=utf-8')
  
      t.end()
    })
    t.end()

})

})