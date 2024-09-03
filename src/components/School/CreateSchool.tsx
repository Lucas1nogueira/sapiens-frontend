import { useAuth } from "@hooks/useAuth";
import { useError } from "@hooks/useError";
import { useSuccess } from "@hooks/useSuccess";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { findAllAdmins } from "services/adminService";
import { saveSchool } from "services/schoolService";
import { findSecretratBySuperAdminId } from "services/secretariatService";
import { Admin } from "types/admin";
import { School } from "types/school";
import { Secretariat } from "types/secretariat";
import { SuperAdmin } from "types/superAdmin";

export function CreateSchool() {
  const { user } = useAuth();
  const { setError } = useError();
  const { setSuccess } = useSuccess();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [admins, setAdmins] = useState<Admin[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin>({} as Admin);

  const [secretariat, setSecretariat] = useState<Secretariat>({
    superAdmin: user as SuperAdmin,
  } as Secretariat);

  useEffect(() => {
    if (user?.id) {
      findSecretratBySuperAdminId(user.id)
        .then((response) => setSecretariat(response.data))
        .catch((error) => console.log(error.response.data));
    }
  }, [user?.id]);

  useEffect(() => {
    findAllAdmins()
      .then((response) => setAdmins(response.data))
      .catch((error) => console.log(error.response.data));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const school: School = {
      id: null as unknown as string,
      name,
      address,
      city,
      state,
      zipCode,
      phone,
      email,
      secretariat,
      admin: selectedAdmin,
      students: [],
      teachers: [],
      schoolClasses: [],
      disciplines: [],
    };

    saveSchool(school)
      .then(() => {
        setName("");
        setAddress("");
        setCity("");
        setState("");
        setZipCode("");
        setPhone("");
        setEmail("");
        setSelectedAdmin({} as Admin);

        setSuccess("Escola criada com sucesso!");
      })
      .catch((error) => setError(error.response.data));
  };

  return (
    <Card shadow="none">
      <CardHeader className="flex justify-center">
        <h1 className="text-2xl font-bold">Nova Escola</h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nome"
              type="text"
              placeholder="Insira o nome da escola"
              value={name}
              onChange={(event) => setName(event.target.value)}
              isRequired
            />
            <Input
              label="Endereço"
              type="text"
              placeholder="Insira o endereço da escola"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              isRequired
            />
            <Input
              label="Cidade"
              type="text"
              placeholder="Insira a cidade"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              isRequired
            />
            <Input
              label="Estado"
              type="text"
              placeholder="Insira o estado"
              value={state}
              onChange={(event) => setState(event.target.value)}
              isRequired
            />
            <Input
              label="CEP"
              type="text"
              placeholder="Insira o CEP"
              value={zipCode}
              onChange={(event) => setZipCode(event.target.value)}
              isRequired
            />
            <Input
              label="Telefone"
              type="text"
              placeholder="Insira o telefone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              isRequired
            />
            <Input
              label="Email"
              type="email"
              placeholder="Insira o email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              isRequired
            />
            <Autocomplete
              label="Atribua o Administrador"
              variant="bordered"
              defaultItems={admins}
              onSelectionChange={(key) => {
                const admin = admins.find((admin) => admin.id == key);
                setSelectedAdmin(admin ?? ({} as Admin));
              }}
            >
              {(item) => (
                <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
              )}
            </Autocomplete>
          </div>

          <Button color="primary" type="submit" fullWidth>
            Criar Escola
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
