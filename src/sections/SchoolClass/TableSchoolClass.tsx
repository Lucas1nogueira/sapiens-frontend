import { CustomModal } from "@components/Common/CustomModal";
import { Icon } from "@iconify/react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import { ModalType } from "types/modal";
import { SchoolClass } from "types/schoolClass";
import { SchoolClassStudents } from "./SchoolClassStudents";
import { SchoolClassDisciplines } from "./SchoolClassDisciplines";
import { SchoolClassTeachers } from "./SchoolClassTeachers";
import { AssignStudents } from "./AssignStudents";
import { AssignDisciplines } from "./AssignDisciplines";
import {
  findAllSchoolClasses,
  findSchoolClassBySchoolId,
} from "services/schoolClassService";
import { useAuth } from "@hooks/useAuth";
import { enqueueNotification } from "utils/enqueueNotification";
import { ConfirmPopover } from "@components/Common/ConfirmPopover";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@components/Common/Loading";
import { EmptyContent } from "@components/Common/EmptyContent";

const columns = [
  { key: "code", label: "Código" },
  { key: "students", label: "Alunos" },
  { key: "disciplines", label: "Disciplinas" },
  { key: "teachers", label: "Professores" },
  { key: "addStudents", label: "Adicionar Alunos" },
  { key: "addDiscipline", label: "Adicionar Disciplinas" },
  { key: "edit", label: "Editar" },
  { key: "delete", label: "Excluir" },
];

type Props = {
  filterValue: string;
  customModalDisclosure: ModalType;
};

export function TableSchoolClass({ filterValue }: Props) {
  const { userSchool } = useAuth();
  const [content, setContent] = useState<JSX.Element>(<></>);
  const disclosure = useDisclosure();

  const queryFn = useMemo(() => {
    if (!userSchool) return undefined;

    return userSchool.name === "Todas as Escolas"
      ? findAllSchoolClasses
      : () => findSchoolClassBySchoolId(userSchool?.id as string);
  }, [userSchool]);

  const { data: schoolClassesData, isLoading: schoolClassesLoading } = useQuery(
    {
      queryKey: ["tableSchoolClasses", userSchool?.name],
      queryFn,
    }
  );

  const schoolClasses = useMemo(
    () => schoolClassesData || [],
    [schoolClassesData]
  );

  const items = useMemo(() => {
    if (!filterValue) {
      return schoolClasses;
    }

    return schoolClasses.filter((schoolClass) => {
      return schoolClass.code.toLowerCase().includes(filterValue.toLowerCase());
    });
  }, [schoolClasses, filterValue]);

  const handleShowStudents = (schoolClass: SchoolClass) => {
    disclosure.onOpenChange();
    setContent(<SchoolClassStudents schoolClass={schoolClass} />);
  };

  const handleShowDisciplines = (schoolClass: SchoolClass) => {
    disclosure.onOpenChange();
    setContent(<SchoolClassDisciplines schoolClass={schoolClass} />);
  };

  const handleAssignDiscipline = (schoolClass: SchoolClass) => {
    disclosure.onOpenChange();
    setContent(<AssignDisciplines schoolClass={schoolClass} />);
  };

  const handleAssignStudents = (schoolClass: SchoolClass) => {
    disclosure.onOpenChange();
    setContent(<AssignStudents schoolClass={schoolClass} />);
  };

  const handleShowTeachers = (schoolClass: SchoolClass) => {
    disclosure.onOpenChange();
    setContent(<SchoolClassTeachers schoolClass={schoolClass} />);
  };

  return (
    <>
      <Table aria-label="Table with all college groups">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items}
          isLoading={schoolClassesLoading}
          loadingContent={<Loading />}
          emptyContent={<EmptyContent />}
        >
          {(schoolClass) => (
            <TableRow key={schoolClass.code}>
              <TableCell>{schoolClass.code}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleShowStudents(schoolClass)}
                  isIconOnly
                >
                  <Icon icon="ph:student-bold" width={22} />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleShowDisciplines(schoolClass)}
                  isIconOnly
                >
                  <Icon icon="ic:baseline-class" width={22} />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleShowTeachers(schoolClass)}
                  isIconOnly
                >
                  <Icon icon="ic:baseline-class" width={22} />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleAssignStudents(schoolClass)}
                  isIconOnly
                >
                  <Icon icon="material-symbols:add" width={22} />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleAssignDiscipline(schoolClass)}
                  isIconOnly
                >
                  <Icon icon="material-symbols:add" width={22} />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() =>
                    enqueueNotification("Funcionalidade indisponível!", "info")
                  }
                  isIconOnly
                >
                  <Icon icon="material-symbols:edit" width={30} />
                </Button>
              </TableCell>
              <TableCell>
                <ConfirmPopover
                  trigger={
                    <Button color="danger" variant="ghost" isIconOnly>
                      <Icon icon="material-symbols:delete" width={30} />
                    </Button>
                  }
                  title="Ainda não é possível excluir uma turma!"
                  confirmAction={
                    <Button
                      color="danger"
                      className="disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled
                    >
                      Excluir
                    </Button>
                  }
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <CustomModal useDisclosure={disclosure} content={content} />
    </>
  );
}
