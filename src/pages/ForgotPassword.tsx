import { Logo } from "@components/Common/Logo";
import { Link } from "react-router-dom";

export function ForgotPassword() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="w-96">
        <Logo className="w-40" />
      </div>
      <div className="text-center mt-10">
        <h1>Funcionalidade em desenvolvimento!</h1>
        <p>
          <Link
            className="block p-2 mt-4 text-blue-500 rounded-md border-blue-500 border-2 hover:text-white hover:bg-blue-500"
            to="/"
          >
            Voltar para Home
          </Link>
        </p>
      </div>
    </div>
  );
}
