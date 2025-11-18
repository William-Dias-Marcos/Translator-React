import { useEffect, useState } from "react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ToogleTheme() {
  // Inicializa o estado diretamente a partir do localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      return false;
    }
    return true; // padrão dark
  });

  // Aplica o tema no DOM e salva no localStorage quando mudar
  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  return (
    <label className="flex cursor-pointer gap-2 items-center">
      <FontAwesomeIcon icon={faSun} />
      <input
        type="checkbox"
        className="toggle theme-controller"
        checked={darkMode}
        onChange={(e) => setDarkMode(e.target.checked)}
      />
      <FontAwesomeIcon icon={faMoon} />
    </label>
  );
}

export default ToogleTheme;
