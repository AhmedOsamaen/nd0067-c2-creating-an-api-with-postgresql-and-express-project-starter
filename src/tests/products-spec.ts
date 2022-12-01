import { ProductsStore } from "../models/products";

const store = new ProductsStore()

describe("products Model", () => {
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

  it('create method should add a product', async () => {
    const result = await store.create({
        "name":"Nike Force",
        "price":4421
    });
    console.log('result :>> ', result);
    expect(result).toEqual({
        "id": 1,
        "name": "Nike Force",
        "price": 4421
    });
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([{
        "id": 1,
        "name": "Nike Force",
        "price": 4421
    }]);
  });

});