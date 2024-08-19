import { Icon } from "@iconify/react/dist/iconify.js";

export function Footer() {
  const currYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-4">
            <h2 className="text-lg font-semibold mb-3">Informações</h2>
            <ul className="text-sm space-y-1">
              <li>
                <p className="hover:text-gray-400">Gestão Acadêmica</p>
              </li>
              <li>
                <p className="hover:text-gray-400">Matrículas e Inscrições</p>
              </li>
              <li>
                <p className="hover:text-gray-400">
                  Acompanhamento de Desempenho
                </p>
              </li>
              <li>
                <p className="hover:text-gray-400">Gestão de Turmas</p>
              </li>
              <li>
                <p className="hover:text-gray-400">Comunicação Integrada</p>
              </li>
              <li>
                <p className="hover:text-gray-400">Suporte e Atendimento</p>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/3 mb-6">
            <h2 className="text-lg font-semibold mb-4">Contato</h2>
            <ul className="text-sm space-y-2">
              <li>
                Email:{" "}
                <a
                  href="mailto:contato@sapienseducacao.com"
                  className="hover:text-gray-400"
                >
                  contato@sapienseducacao.com
                </a>
              </li>
              <li>
                Telefone:{" "}
                <a href="tel:+5511999999999" className="hover:text-gray-400">
                  (74) 99999-9999
                </a>
              </li>
              <li>Endereço: Rua Exemplo, 123, Irecê - BA</li>
            </ul>
          </div>

          <div className="w-full md:w-1/3 mb-6">
            <h2 className="text-lg font-semibold mb-4">Redes Sociais</h2>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <Icon icon="ri:instagram-fill" width={34} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <Icon icon="mingcute:linkedin-fill" width={34} />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm mt-8">
          <p>
            &copy; {currYear} Sapiens Educação. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
