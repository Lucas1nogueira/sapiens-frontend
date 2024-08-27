type Props = {
  title: string;
  description: string;
  icon: JSX.Element;
};

export function ServiceCard({ title, description, icon }: Props) {
  return (
    <div className="border-1 border-zinc-500 rounded-lg px-2 py-8 bg-white hover:bg-blue-600 w-80 h-80 cursor-pointer text-black hover:text-white text-center">
      <div className="w-28 mx-auto py-4">{icon}</div>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}
