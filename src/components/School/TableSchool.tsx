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
import { useEffect, useMemo, useState } from "react";
import { School } from "types/school";
import { ModalType } from "types/modal";
import { ConfirmPopover } from "@components/Common/ConfirmPopover";
import { findAllSchools } from "services/schoolService";
import { ChangeSchool } from "./ChangeSchool";

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

export function TableSchool({ filterValue, customModalDisclosure }: Props) {
  const [schools, setSchools] = useState<School[]>([]);
  const [content, setContent] = useState<JSX.Element>(<></>);
  const disclosure = useDisclosure();

  useEffect(() => {
    findAllSchools()
      .then((response) => setSchools(response.data))
      .catch((error) => console.log(error));
  }, [disclosure.isOpen, customModalDisclosure.isOpen]);

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
        <TableBody items={items}>
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
