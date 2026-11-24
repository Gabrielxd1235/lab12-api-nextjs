const endpoints = [
  ["GET", "/api/hello", "Mensaje de prueba"],
  ["GET", "/api/products", "Lista de productos"],
  ["GET", "/api/products?minPrice=20&maxPrice=100", "Filtro por rango de precio"],
  ["GET", "/api/products?name=Teclado", "Filtro por nombre"],
  ["POST", "/api/products", "Crear producto { name, price }"],
  ["GET", "/api/products/2", "Producto por id"],
  ["DELETE", "/api/products/2", "Eliminar producto"],
  ["GET", "/api/users", "Lista de usuarios"],
  ["POST", "/api/users", "Crear usuario { name, email, age }"],
  ["PUT", "/api/users?id=1", "Actualizar campos de un usuario"],
  ["DELETE", "/api/users?id=1", "Eliminar usuario"],
];

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-8 font-sans">
      <h1 className="text-3xl font-bold">Mi API con Next.js</h1>
      <p className="mt-2 text-zinc-500">Laboratorio 12: endpoints personalizados en la carpeta pages/api.</p>
      <table className="mt-6 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-500/40">
            <th className="py-2 pr-4">Método</th>
            <th className="pr-4">Endpoint</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {endpoints.map(([method, url, desc]) => (
            <tr key={method + url} className="border-b border-zinc-500/20">
              <td className="py-2 pr-4 font-mono font-semibold">{method}</td>
              <td className="pr-4 font-mono">
                {method === "GET" ? <a className="text-blue-500 underline" href={url}>{url}</a> : url}
              </td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
