import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonProps {
  onClick: () => void;
  icon: IconDefinition;
  className?: string;
  tooltip?: string;
}

function Button({ onClick, icon, className = "", tooltip = "" }: ButtonProps) {
  return (
    <div className={tooltip ? "tooltip" : ""} data-tip={tooltip}>
      <button
        onClick={onClick}
        className={`p-2 rounded cursor-pointer ${className}`}
        type="button"
      >
        <FontAwesomeIcon icon={icon} />
      </button>
    </div>
  );
}

export default Button;
