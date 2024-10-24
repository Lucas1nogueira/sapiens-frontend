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
import { School } from "types/school";
import { ModalType } from "types/modal";
import { ConfirmPopover } from "@components/Common/ConfirmPopover";
import { findAllSchools } from "services/schoolService";
import { ChangeSchool } from "./ChangeSchool";
import { Loading } from "@components/Common/Loading";
import { EmptyContent } from "@components/Common/EmptyContent";
import { useQuery } from "@tanstack/react-query";

const columns = [
  { key: "name", label: "Nome" },
  { key: "city", label: "Cidade" },
  { key: "state", label: "Estado" },
  { key: "edit", label: "Editar" },
  { key: "delete", label: "Excluir" },
];

type Props = {
  filterValue: string;
  customModalDisclosure: ModalType;
};

export function TableSchool({ filterValue }: Props) {
  const [content, setContent] = useState<JSX.Element>(<></>);
  const disclosure = useDisclosure();

  const { data: schoolsData, isLoading: schoolsLoading } = useQuery({
    queryKey: ["tableSchools"],
    queryFn: findAllSchools,
  });

  const schools = useMemo(() => schoolsData || [], [schoolsData]);

  const items = useMemo(() => {
    if (!filterValue) {
      return schools;
    }

    return schools.filter((school) => {
      return (
        school.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        school.city.toLowerCase().includes(filterValue.toLowerCase()) ||
        school.state.toLowerCase().includes(filterValue.toLowerCase())
      );
    });
  }, [schools, filterValue]);

  const handleEdit = (school: School) => {
    setContent(<ChangeSchool school={school} />);
    disclosure.onOpenChange();
  };

  return (
    <>
      <Table aria-label="Table with all schools">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items}
          isLoading={schoolsLoading}
          loadingContent={<Loading />}
          emptyContent={<EmptyContent />}
        >
          {(school) => (
            <TableRow key={school.id}>
              <TableCell>{school.name}</TableCell>
              <TableCell>{school.city}</TableCell>
              <TableCell>{school.state}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleEdit(school)}
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
                  title="Ainda não é possível excluir uma escola!"
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
