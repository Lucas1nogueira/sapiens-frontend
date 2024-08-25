import { Button } from "@nextui-org/react";

type Props = {
  handleTabChange: (newTab: string, breadcrumb: string) => void;
};

export function DiaryTab({ handleTabChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      <Button color="primary" onClick={() => handleTabChange("lesson", "Aula")}>
        Aula
      </Button>
      <Button
        color="primary"
        onClick={() => handleTabChange("attendance", "Presença")}
      >
        Presença
      </Button>
      <Button
        color="primary"
        onClick={() => handleTabChange("evaluations", "Avaliações")}
      >
        Avaliações
      </Button>
      <Button
        color="primary"
        onClick={() => handleTabChange("grades", "Notas")}
      >
        Notas
      </Button>
    </div>
  );
}
