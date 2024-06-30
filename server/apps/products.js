import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    const collection = db.collection("products");
    const products = await collection.find().toArray();
    return res.json({
      data: products,
    });
  } catch (error) {
    return res.json({ message: "error" });
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productId = new ObjectId(req.params.id);
    const product = await collection.findOne({ _id: productId });
    return res.json({
      data: product,
    });
  } catch (error) {
    return res.json({ message: "error" });
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productData = { ...req.body };
    const products = await collection.insertOne(productData);
    return res.json({
      message: `Product Id ${products.insertedId}has been created successfully`,
    });
  } catch (error) {
    return res.json({ message: "error" });
  }
});

productRouter.put("/:id", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productId = new ObjectId(req.params.id);
    const newProductData = { ...req.body };
    await collection.updateOne(
      {
        _id: productId,
      },
      {
        $set: newProductData,
      }
    );
    return res.json({
      message: `Product record (${productId}) has been updated successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "error" });
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productId = new ObjectId(req.params.id);
    await collection.deleteOne({
      _id: productId,
    });
    return res.json({
      message: `Product record (${productId}) has been deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "error" });
  }
});

export default productRouter;
