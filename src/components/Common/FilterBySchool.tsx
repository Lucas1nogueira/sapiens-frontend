import { useAuth } from "@hooks/useAuth";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { findAllSchools } from "services/schoolService";
import { School } from "types/school";

export function FilterBySchool() {
  const { userSchool, setUserSchool } = useAuth();
  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    findAllSchools()
      .then((response) => {
        const allSchools = response.data;

        allSchools.unshift({
          id: Date.now().toString(),
          name: "Todas as Escolas",
        } as School);

        setUserSchool(allSchools[0]);
        setSchools(allSchools);
      })
      .catch((error) => console.log(error));
  }, [setUserSchool]);

  return (
    <div>
      <Autocomplete
        label="Escolha uma Escola"
        variant="bordered"
        defaultItems={schools}
        placeholder="Buscar uma Escola"
        size="sm"
        selectedKey={userSchool ? userSchool.id.toString() : ""}
        onSelectionChange={(key) => {
          const school = schools.find((s) => s.id == key);

          if (school) {
            setUserSchool(school);
          }
        }}
      >
        {(item) => (
          <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
}
