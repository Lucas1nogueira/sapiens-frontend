import { Button } from "@nextui-org/react";

type Props = {
  handleTabChange: (newTab: string, breadcrumb: string) => void;
};

export function DiaryTab({ handleTabChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      <Button
        color="primary"
        onClick={() => handleTabChange("lesson", "Registro de Aulas")}
      >
        Registro de Aulas
      </Button>
      <Button
        color="primary"
        onClick={() => handleTabChange("attendance", "Registro de Frequências")}
      >
        Registro de Frequências
      </Button>
      <Button
        color="primary"
        onClick={() => handleTabChange("evaluations", "Registro de Avaliações")}
      >
        Registro de Avaliações
      </Button>
      <Button
        color="primary"
        onClick={() => handleTabChange("grades", "Registro de Notas")}
      >
        Registro de Notas
      </Button>
    </div>
  );
}
