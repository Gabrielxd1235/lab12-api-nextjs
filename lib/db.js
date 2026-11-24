// "Base de datos" en memoria compartida por todos los endpoints.
// globalThis evita que cada API route (o cada recarga en dev) tenga su propia copia.
// shortcut: los datos se pierden al reiniciar el servidor, usar una BD real (PostgreSQL, MongoDB) en producción.
globalThis.db ??= {
  products: [
    { id: 1, name: "Laptop", price: 1200 },
    { id: 2, name: "Mouse", price: 25 },
    { id: 3, name: "Teclado", price: 50 },
  ],
  users: [
    { id: 1, name: "Juan Pérez", email: "juan@example.com", age: 25 },
    { id: 2, name: "María López", email: "maria@example.com", age: 30 },
  ],
};

export const db = globalThis.db;

// Siguiente id = mayor id + 1 (con length + 1 se repetirían ids después de un DELETE).
export const nextId = (list) => Math.max(0, ...list.map((x) => x.id)) + 1;
