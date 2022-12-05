import supertest from 'supertest';
import app from '../server';

const request = supertest(app);
let test_token = ''

describe('Test USERS endpoint responses', () => {
  it('creates new user endpoint', async() => {
    const requestBody={"firstName":"Ahmed","lastName":"Osama","password":"Ss123456"}
  await  request
      .post('/users').send(requestBody).set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200);
  });

  it('gets token by admin user endpoint',async () => {
    const requestBody={"firstName":"Ahmed",
                        "password":"Ss123456"}
   const respp= await request
       .post('/users/auth').send(requestBody).set('Content-Type', 'application/json')
       .set('Accept', 'application/json')
       .expect(200);
       test_token = 'Bearer '+ respp.body
       console.log('test_token :>> ', test_token);
   });

    

    it('gets the users index endpoint', async() => {
      console.log('test_token before :>> ', test_token);
      await request
         .get('/users').set('Authorization', test_token)
         .expect(200);
     });

    it('gets user by id endpoint',async () => {
    await  request
        .get('/users/1').set('Authorization', test_token)
        .expect(200);
    });

    it('deletes user by id endpoint',async () => {
      await  request
          .delete('/users/2').set('Authorization', test_token)
          .expect(200);
      });

    it('gets user by id endpoint bad request',async () => {
     await request
        .get('/users/sffw').set('Authorization', test_token)
        .expect(400);
    });

    it('deletes user by id endpoint bad request',async () => {
      await request
         .delete('/users/sffw').set('Authorization', test_token)
         .expect(400);
     });
  });

  describe('Test Products endpoint responses', () => {

    it('creates new product endpoint', async() => {
      const requestBody={"name":"Nike Force",
      "price":"4421"}
    await  request
        .post('/products').send(requestBody).set('Content-Type', 'application/json')
        .set('Accept', 'application/json').set('Authorization', test_token)
        .expect(200);
    });
    it('gets the products index endpoint', async() => {
     await request
        .get('/products')
        .expect(200);
    });

    it('gets the product by id endpoint', async() => {
      await request
         .get('/products/1')
         .expect(200);
     });

     it('deletes the product by id endpoint', async() => {
      const requestBody={"name":"Nike Force",
      "price":"4421"}
    await  request
        .post('/products').send(requestBody).set('Content-Type', 'application/json')
        .set('Accept', 'application/json').set('Authorization', test_token)
    await request
         .delete('/products/2')
         .expect(200);
     });

     it('deletes product by id endpoint bad request',async () => {
       await request
          .delete('/products/sffw')
          .expect(400);
      });
  });

  describe('Test Orders endpoint responses', () => {

    it('creates new order endpoint', async() => {
      const userReqBody={"firstName":"Ahmed","lastName":"Osama","password":"Ss123456"}
    await  request
        .post('/users').send(userReqBody).set('Content-Type', 'application/json')
        .set('Accept', 'application/json').set('Authorization', test_token)
      const requestBody={"user_id":3}
    await  request
        .post('/orders').send(requestBody).set('Content-Type', 'application/json')
        .set('Accept', 'application/json').set('Authorization', test_token)
        .expect(200);
    });
 
    it('gets the orders endpoint', (done) => {
      request
        .get('/orders')
        .expect(200).set('Authorization', test_token);
      done();
    });

    it('gets active order by user id endpoint', async() => {
      await request
         .get('/orders/user/3').set('Authorization', test_token)
         .expect(200).set('Authorization', test_token);
     });

     it('completes user order by order id endpoint', async() => {
      await request
         .put('/orders/complete/1').set('Authorization', test_token)
         .expect(200);
     });

     it('gets completed orders by user id endpoint', async() => {
      await request
         .get('/orders/user/complete/3').set('Authorization', test_token)
         .expect(200);
     });
  });

