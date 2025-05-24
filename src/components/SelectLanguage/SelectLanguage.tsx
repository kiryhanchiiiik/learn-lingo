import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import sprite from "../../img/sprite.svg";
import css from "./SelectLanguage.module.scss";

const SelectLanguage = () => {
  const [languages, setLanguages] = useState<string[] | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axiosInstance.get("/languages.json");
        setLanguages(response.data.languages);
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
    setSelectedLanguage(language);
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
          {selectedLanguage || "Languages"}
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
