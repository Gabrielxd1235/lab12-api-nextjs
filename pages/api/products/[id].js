import { db } from "../../../lib/db";

export default function handler(req, res) {
  const { id } = req.query;
  const product = db.products.find((p) => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  if (req.method === "GET") {
    return res.status(200).json(product);
  }

  if (req.method === "DELETE") {
    db.products = db.products.filter((p) => p.id !== product.id);
    return res.status(200).json({ message: "Producto eliminado" });
  }

  res.setHeader("Allow", ["GET", "DELETE"]);
  res.status(405).json({ message: "Método no permitido" });
}
