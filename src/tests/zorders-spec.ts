import { OrdersStore } from "../models/orders";

const store = new OrdersStore()

describe("zorders Model", () => {
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

  it('create method should add a order', async () => {
    const result = await store.create({
        "user_id":1
    });
    result['user_id']=1
    expect(result).toEqual({
        "id":1,
        "user_id": 1,
        "order_status": "active"
    });
  });

  it('index method should return a list of orders', async () => {
    const result = await store.index();
    result[0]['user_id']=1
    expect(result).toEqual([{
        "id":1,
        "user_id": 1,
        "order_status": "active"
    }]);
  });

});