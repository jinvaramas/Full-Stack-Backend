import { products } from "./product.model.js";

export const getProducts = (req, res) => {
  res.json({ products });
};

export const createProduct = (req, res) => {
  const { name, price, description } = req.body || {};

  if (!name || !price) {
    return res.status(400).json({ error: "name and price are required" });
  }

  const nextId = String(
    (products.reduce((max, p) => Math.max(max, Number(p.id)), 0) || 0) + 1,
  );

  const newProduct = { id: nextId, name, price, description };
  products.push(newProduct);

  return res.status(201).json(newProduct);
};

export const deleteProduct = (req, res) => {
  const index = products.findIndex((p) => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const deleted = products.splice(index, 1);

  res.status(200).json(deleted[0]);
};
