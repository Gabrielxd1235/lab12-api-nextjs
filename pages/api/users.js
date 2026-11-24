import { db, nextId } from "../../lib/db";

const EDITABLE = ["name", "email", "age"];

// Valida solo los campos que llegan (sirve para POST completo y para PUT parcial).
function validate(data) {
  if ("name" in data && (typeof data.name !== "string" || !data.name.trim())) return "name debe ser un texto";
  if ("email" in data && !/^\S+@\S+\.\S+$/.test(data.email)) return "email no es válido";
  if ("age" in data && !(Number.isInteger(data.age) && data.age > 0)) return "age debe ser un entero positivo";
  return null;
}

export default function handler(req, res) {
  const body = req.body ?? {};
  // El id se puede enviar en la URL (?id=1) o en el body.
  const id = parseInt(req.query.id ?? body.id);

  if (req.method === "GET") {
    return res.status(200).json(db.users);
  }

  if (req.method === "POST") {
    const { name, email, age } = body;
    if (!name || !email || age === undefined) {
      return res.status(400).json({ message: "name, email y age son requeridos" });
    }
    const error = validate({ name, email, age });
    if (error) return res.status(400).json({ message: error });
    const user = { id: nextId(db.users), name, email, age };
    db.users.push(user);
    return res.status(201).json(user);
  }

  if (req.method === "PUT" || req.method === "DELETE") {
    const user = db.users.find((u) => u.id === id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (req.method === "DELETE") {
      db.users = db.users.filter((u) => u.id !== id);
      return res.status(200).json({ message: "Usuario eliminado", user });
    }

    // PUT parcial: solo se cambian los campos enviados; el id nunca se sobreescribe.
    const changes = Object.fromEntries(Object.entries(body).filter(([k]) => EDITABLE.includes(k)));
    if (Object.keys(changes).length === 0) {
      return res.status(400).json({ message: "Envía al menos un campo: name, email o age" });
    }
    const error = validate(changes);
    if (error) return res.status(400).json({ message: error });
    Object.assign(user, changes);
    return res.status(200).json(user);
  }

  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  res.status(405).json({ message: "Método no permitido" });
}
