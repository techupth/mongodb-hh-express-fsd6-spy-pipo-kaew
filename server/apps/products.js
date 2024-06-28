import { Router, query } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const name = req.query.name;
  const category = req.query.category;
  const query = {};
  if (name) {
    query.name = new RegExp(name, "i");
  }
  if (category) {
    query.category = new RegExp(category, "i");
  }

  const collection = db.collection("products");
  const products = await collection.find(query).toArray();

  return res.status(200).json({ data: products });
});

productRouter.get("/:id", async (req, res) => {
  const productId = new ObjectId(req.params.id);
  const collection = db.collection("products");
  const products = await collection.findOne({ _id: productId });
  return res.status(200).json({ data: products });
});

productRouter.post("/", async (req, res) => {
  const collection = db.collection("products");
  const productData = { ...req.body };
  const products = await collection.insertOne(productData);
  return res.status(201).json({
    message: "Product has been created successfully",
  });
});

productRouter.put("/:id", async (req, res) => {
  const productId = new ObjectId(req.params.id);
  const collection = db.collection("products");
  const updateData = { ...req.body };
  const products = await collection.updateOne(
    { _id: productId },
    { $set: updateData }
  );
  return res.status(200).json({
    message: "Product has been updated successfully",
  });
});

productRouter.delete("/:id", async (req, res) => {
  const productId = new ObjectId(req.params.id);
  const collection = db.collection("products");
  await collection.deleteOne({ _id: productId });
  return res.status(200).json({
    message: "Product has been deleted successfully",
  });
});

export default productRouter;
