import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-red-500 text-white">
      <h1>Not Found</h1>
      <p>Página não encontrada!</p>
      <Link
        to="/"
        className="border px-4 py-2 rounded hover:bg-white bg-transparent hover:text-red-500 mt-4"
      >
        Voltar para Home
      </Link>
    </div>
  );
}
