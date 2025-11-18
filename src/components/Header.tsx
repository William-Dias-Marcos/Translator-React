import ToogleTheme from "./ToogleTheme";

function Header({ title }: { title: string }) {
  return (
    <header className="w-full p-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <ToogleTheme />
      </div>
    </header>
  );
}

export default Header;
