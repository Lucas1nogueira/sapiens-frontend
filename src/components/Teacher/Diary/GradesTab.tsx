import { CustomModal } from "@components/Common/CustomModal";
import { CreateGrade } from "@components/Grade/CreateGrade";
import { EditGrade } from "@components/Grade/EditGrade";
import { Button, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { Evaluation } from "types/evaluation";
import { Student } from "types/student";

type Props = {
  evaluations: Evaluation[];
  students: Student[];
};

export function GradesTab({ evaluations, students }: Props) {
  const [content, setContent] = useState<JSX.Element>(<></>);
  const disclosure = useDisclosure();

  const handleCreateGrade = (evaluation: Evaluation) => {
    setContent(<CreateGrade students={students} evaluation={evaluation} />);
    disclosure.onOpenChange();
  };

  const handleEditGrade = (evaluation: Evaluation) => {
    setContent(<EditGrade evaluation={evaluation} />);
    disclosure.onOpenChange();
  };

  return (
    <div className="flex flex-col gap-2">
      {evaluations.map((evaluation) => (
        <div key={evaluation.id} className="flex flex-col gap-2 mb-4">
          <h3 className="text-lg font-semibold">{evaluation.name}</h3>
          <Button onClick={() => handleCreateGrade(evaluation)}>
            Lançar Notas
          </Button>
          <Button onClick={() => handleEditGrade(evaluation)}>
            Editar Notas
          </Button>
        </div>
      ))}

      <CustomModal useDisclosure={disclosure} content={content} size="full" />
    </div>
  );
}
