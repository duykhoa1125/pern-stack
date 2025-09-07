import { Palette } from "lucide-react";
import { THEMES } from "../constant";
import { useThemeStore } from "../store/useThemeStore";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
        <Palette className="size-6 text-primary" />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow"
      >
        {THEMES.map((themeOption) => (
          <li key={themeOption.name}>
            <button onClick={() => setTheme(themeOption.name)}>
              <Palette
                className={`size-6 text-primary ${
                  theme === themeOption.name
                    ? "bg-primary/10"
                    : "hover:bg-base-content/5"
                }`}
              />
              <span>{themeOption.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelector;
