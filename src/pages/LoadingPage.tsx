import { Spinner } from "@nextui-org/react";

export function LoadingPage() {
  return (
    <div className="absolute inset-0 w-screen h-screen flex justify-center items-center">
      <Spinner size="lg" color="primary" label="Carregando..." />
    </div>
  );
}
