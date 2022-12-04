import express, { Request, Response } from "express";
import { verifyAuthToken } from "../middleware/jwt-auth";
import { Orders, OrdersStore } from "../models/orders";
import { OrderProductsService } from "../services/order-product.service";

const ordersStore = new OrdersStore();
const orderProdService = new OrderProductsService();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await ordersStore.index();
    res.json(orders);
  } catch (error) {
    res.status(500);
    res.send("Res:" + error);
  }
};

const orderProductsIndex = async (req: Request, res: Response) => {
  try {
    const orders = await orderProdService.index();
    res.json(orders);
  } catch (error) {
    res.status(500);
    res.send("Res:" + error);
  }
};

const getorderById = async (req: Request, res: Response) => {
  try {
    const orders = await ordersStore.getById(req.params.id);
    res.json(orders);
  } catch (error) {
    res.status(500);
    res.send("Res:" + error);
  }
};

const getOrderProductsDetailsByOrderId = async (
  req: Request,
  res: Response
) => {
  try {
    const orders = await orderProdService.getOrderProductsDetails(
      req.params.id
    );
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.send("Res:" + err);
  }
};

const getActiveOrderByUserId = async (req: Request, res: Response) => {
  try {
    const orders = await orderProdService.getActiveOrderProductsDetails(
      req.params.id
    );
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.send("Res:" + err);
  }
};

const getCompletedOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const orders = await orderProdService.completedOrders(req.params.id);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.send("Res:" + err);
  }
};

const createorder = async (req: Request, res: Response) => {
  try {
    const order: Orders = {
      user_id: req.body.user_id,
    };
    const neworder = await ordersStore.create(order);
    res.json(neworder);
  } catch (err) {
    res.status(400);
    res.send("Res:" + err);
  }
};

const completeOrder = async (req: Request, res: Response) => {
  try {
    const completedOrder = await ordersStore.completeOrder(req.params.id);
    res.json(completedOrder);
  } catch (err) {
    res.status(400);
    res.send("Res:" + err);
  }
};

const deleteorderById = async (req: Request, res: Response) => {
  try {
    const users = await ordersStore.delete(req.params.id);
    res.json(users);
  } catch (err) {
    res.status(400);
    res.send("Res:" + err);
  }
};

const addProductToOrder = async (req: Request, res: Response) => {
  const orderId: string = req.params.id;
  const productId: string = req.body.productId;
  const quantity: number = parseInt(req.body.quantity);

  try {
    const addedProduct = await orderProdService.addProduct(
      quantity,
      orderId,
      productId
    );
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.send("Res:" + err);
  }
};

const allOrders_routes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken,orderProductsIndex);
  app.post("/orders", verifyAuthToken,createorder);
  app.put("/orders/complete/:id", verifyAuthToken,completeOrder);
  app.get("/orders/:id",verifyAuthToken, getOrderProductsDetailsByOrderId);
  app.get("/orders/user/:id", verifyAuthToken, getActiveOrderByUserId);
  app.get(
    "/orders/user/complete/:id",
    verifyAuthToken,
    getCompletedOrdersByUserId
  );
  app.delete("/orders/:id",verifyAuthToken ,deleteorderById);
  app.post("/orders/:id/products", verifyAuthToken,addProductToOrder);
};

export default allOrders_routes;
