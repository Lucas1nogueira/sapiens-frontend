import logo from "@assets/logo.png";

type Props = {
  className?: string;
};

export function Logo({ className }: Props) {
  return (
    <div className="flex justify-center items-center gap-2">
      <img src={logo} alt="Sapiens Logo" className={className} />
      <h1 className="text-xl font-bold">Sapiens Educação</h1>
    </div>
  );
}
