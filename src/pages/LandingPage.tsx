import { useNavigate } from "react-router-dom";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Logo } from "@components/Common/Logo";
import { Footer } from "@components/Common/Footer";
import { servicesData } from "utils/servicesData";
import { ServiceCard } from "@components/Common/ServiceCard";
import education from "@assets/education.jpg";
import logo from "@assets/logo.png";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar>
        <NavbarBrand>
          <Logo className="w-11 h-11" />
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              color="secondary"
              variant="ghost"
              className="max-w-52 w-full rounded-md font-semibold"
              onClick={() => navigate("/login")}
            >
              Fazer Login
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div className="text-center mt-10">
        <div className="relative max-h-[400px] overflow-hidden">
          <img
            src={education}
            alt="Education image."
            className="w-full h-full object-contain
            "
          />
          <div className="absolute inset-0">
            <div className="p-8 bg-black/40 text-white text-center font-semibold h-full flex justify-center items-center">
              <img
                src={logo}
                alt="Logo of Sapiens."
                className="w-40 hidden md:block "
              />
              <div className="w-1/2 text-sm md:text-2xl">
                <h1 className="mb-2">Bem-vindo ao Sapiens Educação!</h1>
                <p>
                  Este que é um sistema projetado para automatizar e otimizar
                  processos administrativos e acadêmicos.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-custom-gradient my-20">
          <div className="max-w-5xl w-full mx-auto my-10">
            <h2 className="text-3xl font-semibold my-8">Nossos Serviços</h2>

            <div className="flex flex-col items-center sm:grid sm:place-items-center gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {servicesData.map((service) => (
                <ServiceCard
                  key={service.title}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
