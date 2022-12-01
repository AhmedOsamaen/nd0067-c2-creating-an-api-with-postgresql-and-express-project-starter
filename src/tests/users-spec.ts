import bcrypt from "bcrypt"
import { UsersStore } from "../models/users";
import { adminPass, pepper, saltRounds } from "../properties/dbconnection";

const store = new UsersStore()

describe("Users Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.getById).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });
  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await store.create({
        "firstname":"Ahmed",
        "lastname":"Osama",
        "password":adminPass
    });
    console.log('result :>> ', result);
    expect(result.firstname).toEqual("Ahmed");
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result[0]['firstname']).toEqual("Ahmed");
  });

  it('show method should return the correct user', async () => {
    const result = await store.getById("1");
    console.log('result :>> ', result);
    expect(result.firstname).toEqual("Ahmed");
  });

});