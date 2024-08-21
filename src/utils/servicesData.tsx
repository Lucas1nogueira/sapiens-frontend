import academic from "../assets/academic.png";
import attendance from "../assets/attendance.png";
import assessment from "../assets/assessment.png";
import classroom from "../assets/classroom.png";
import communication from "../assets/communication.png";
import support from "../assets/support.png";

type Service = {
  title: string;
  description: string;
  icon: JSX.Element;
};

export const servicesData: Service[] = [
  {
    title: "Gestão Académica",
    description:
      "Facilite o gerenciamento das informações acadêmicas, incluindo matrículas, turmas, horários e desempenho dos alunos.",
    icon: (
      <a
        href="https://www.flaticon.com/free-icons/scholarship"
        title="scholarship icons"
        target="_blank"
      >
        <img src={academic} alt="Academic image." />
      </a>
    ),
  },
  {
    title: "Matrículas e Inscrições",
    description:
      "Simplifique o processo de matrícula e inscrição de alunos com um sistema intuitivo.",
    icon: (
      <a
        href="https://www.flaticon.com/free-icons/attendance"
        title="attendance icons"
        target="_blank"
      >
        <img src={attendance} alt="Attendance image." />
      </a>
    ),
  },
  {
    title: "Acompanhamento de Desempenho",
    description:
      "Ofereça ferramentas para acompanhamento do desempenho escolar em tempo real.",
    icon: (
      <a
        href="https://www.flaticon.com/free-icons/appraisal"
        title="Appraisal icons"
        target="_blank"
      >
        <img src={assessment} alt="Assessment image." />
      </a>
    ),
  },
  {
    title: "Gestão de Turmas e Horários",
    description: "Organize turmas e crie horários de forma otimizada.",
    icon: (
      <a
        href="https://www.flaticon.com/free-icons/school"
        title="school icons"
        target="_blank"
      >
        <img src={classroom} alt="Classroom image." />
      </a>
    ),
  },
  {
    title: "Comunicação Integrada",
    description:
      "Facilite a comunicação entre alunos, professores e a administração escolar.",
    icon: (
      <a
        href="https://www.flaticon.com/free-icons/group"
        title="group icons"
        target="_blank"
      >
        <img src={communication} alt="Communication image." />
      </a>
    ),
  },
  {
    title: "Suporte e Atendimento",
    description:
      "Disponibilize suporte telemático e atendimento ao usuário para resolver dúvidas e problemas.",
    icon: (
      <a
        href="https://www.flaticon.com/free-icons/support"
        title="support icons"
        target="_blank"
      >
        <img src={support} alt="Support image." />
      </a>
    ),
  },
];
