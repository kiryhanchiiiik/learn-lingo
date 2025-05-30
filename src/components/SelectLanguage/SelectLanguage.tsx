import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import sprite from "../../img/sprite.svg";
import css from "./SelectLanguage.module.scss";

const SelectLanguage = ({
  selected,
  onChange,
}: {
  selected: string | null;
  onChange: (value: string | null) => void;
}) => {
  const [languages, setLanguages] = useState<string[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axiosInstance.get("/languages.json");
        setLanguages(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLanguages();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleLanguageClick = (language: string) => {
    onChange(language);
    setIsOpen(false);
  };

  return (
    <div className={css.wrapper} ref={dropdownRef}>
      <label className={css.label}>Languages</label>
      <div className={css.customSelect}>
        <button
          type="button"
          className={css.selectButton}
          onClick={handleToggle}
        >
          {selected || "Languages"}
          <div className={`${css.arrow} ${isOpen ? css.arrowUp : ""}`}>
            <svg width="12" height="12">
              <use href={`${sprite}#down`} />
            </svg>
          </div>
        </button>
        {isOpen && languages && (
          <ul className={css.dropdownList}>
            {languages.map((language) => (
              <li
                key={language}
                className={css.dropdownItem}
                onClick={() => handleLanguageClick(language)}
              >
                {language}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectLanguage;
