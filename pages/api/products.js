import { db, nextId } from "../../lib/db";

export default function handler(req, res) {
  if (req.method === "GET") {
    // Filtros opcionales: ?minPrice=20&maxPrice=100&name=Teclado
    const { minPrice, maxPrice, name } = req.query;
    const min = minPrice !== undefined ? Number(minPrice) : -Infinity;
    const max = maxPrice !== undefined ? Number(maxPrice) : Infinity;
    if (Number.isNaN(min) || Number.isNaN(max)) {
      return res.status(400).json({ message: "minPrice y maxPrice deben ser números" });
    }
    const result = db.products.filter(
      (p) =>
        p.price >= min &&
        p.price <= max &&
        (!name || p.name.toLowerCase().includes(String(name).toLowerCase()))
    );
    return res.status(200).json(result);
  }

  if (req.method === "POST") {
    const { name, price } = req.body ?? {};
    if (!name || !price) {
      return res.status(400).json({ message: "Nombre y precio son requeridos" });
    }
    const newProduct = { id: nextId(db.products), name, price: Number(price) };
    db.products.push(newProduct);
    return res.status(201).json(newProduct);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).json({ message: "Método no permitido" });
}
