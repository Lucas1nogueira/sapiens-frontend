import { useAuth } from "@hooks/useAuth";
import { useError } from "@hooks/useError";
import { useSuccess } from "@hooks/useSuccess";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  findSecretratBySuperAdminId,
  updateSecretariat,
} from "services/secretariatService";
import { Secretariat as SecretariatType } from "types/secretariat";
import { SuperAdmin } from "types/superAdmin";

export function Secretariat() {
  const { user } = useAuth();
  const { setError } = useError();
  const { setSuccess } = useSuccess();

  const [secretariat, setSecretariat] = useState<SecretariatType>({
    superAdmin: user as SuperAdmin,
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
  } as SecretariatType);

  useEffect(() => {
    if (user?.id) {
      findSecretratBySuperAdminId(user.id)
        .then((response) => setSecretariat(response.data))
        .catch((error) => console.log(error.response.data));
    }
  }, [user?.id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateSecretariat(secretariat)
      .then(() => {
        setSuccess("Secretaria de Educação atualizada com sucesso!");
      })
      .catch((error) => setError(error.response.data));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (secretariat) {
      const { name, value } = e.target;
      setSecretariat({ ...secretariat, [name]: value });
    }
  };

  return (
    <Card className="max-w-4xl mx-auto mt-10 p-5 shadow-lg border rounded-lg">
      <CardHeader className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Secretaria de Educação
        </h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="name"
              placeholder="Insira o nome da secretaria"
              value={secretariat.name}
              onChange={handleChange}
              label="Nome"
              fullWidth
            />
            <Input
              name="address"
              placeholder="Insira o endereço da secretaria"
              value={secretariat.address}
              onChange={handleChange}
              label="Endereço"
              fullWidth
            />
            <Input
              name="city"
              placeholder="Insira a cidade da secretaria"
              value={secretariat.city}
              onChange={handleChange}
              label="Cidade"
              fullWidth
            />
            <Input
              name="state"
              placeholder="Insira o estado da secretaria"
              value={secretariat.state}
              onChange={handleChange}
              label="Estado"
              fullWidth
            />
            <Input
              name="zipCode"
              placeholder="Insira o CEP da secretaria"
              value={secretariat.zipCode}
              onChange={handleChange}
              label="CEP"
              fullWidth
            />
            <Input
              name="phone"
              placeholder="Insira o telefone da secretaria"
              value={secretariat.phone}
              onChange={handleChange}
              label="Telefone"
              fullWidth
            />
            <Input
              name="email"
              placeholder="Insira o e-mail da secretaria"
              value={secretariat.email}
              onChange={handleChange}
              label="E-mail"
              fullWidth
            />
          </div>
          <Button color="primary" type="submit" className="w-full mt-4">
            Atualizar Dados
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
