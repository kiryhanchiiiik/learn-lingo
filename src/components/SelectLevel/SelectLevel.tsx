import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import sprite from "../../img/sprite.svg";
import css from "./SelectLevel.module.scss";

const SelectLevel = () => {
  const [levels, setLevels] = useState<string[] | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axiosInstance.get("/levels.json");
        setLevels(response.data);
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
    setSelectedLevel(language);
    setIsOpen(false);
  };

  return (
    <div className={css.wrapper} ref={dropdownRef}>
      <label className={css.label}>Level of knowledge</label>
      <div className={css.customSelect}>
        <button
          type="button"
          className={css.selectButton}
          onClick={handleToggle}
        >
          {selectedLevel || "Levels"}
          <div className={`${css.arrow} ${isOpen ? css.arrowUp : ""}`}>
            <svg width="12" height="12">
              <use href={`${sprite}#down`} />
            </svg>
          </div>
        </button>
        {isOpen && levels && (
          <ul className={css.dropdownList}>
            {levels.map((level) => (
              <li
                key={level}
                className={css.dropdownItem}
                onClick={() => handleLanguageClick(level)}
              >
                {level}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectLevel;
