import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import sprite from "../../img/sprite.svg";
import css from "./SelectPrice.module.scss";

const SelectPrice = () => {
  const [prices, setPrices] = useState<string[] | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axiosInstance.get("/prices.json");
        setPrices(response.data);
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

  const handlePriceClick = (price: string) => {
    setSelectedPrice(price);
    setIsOpen(false);
  };

  return (
    <div className={css.wrapper} ref={dropdownRef}>
      <label className={css.label}>Price</label>
      <div className={css.customSelect}>
        <button
          type="button"
          className={css.selectButton}
          onClick={handleToggle}
        >
          {selectedPrice ? `${selectedPrice} $` : "Prices"}
          <div className={`${css.arrow} ${isOpen ? css.arrowUp : ""}`}>
            <svg width="12" height="12">
              <use href={`${sprite}#down`} />
            </svg>
          </div>
        </button>
        {isOpen && prices && (
          <ul className={css.dropdownList}>
            {prices.map((price) => (
              <li
                key={price}
                className={css.dropdownItem}
                onClick={() => handlePriceClick(price)}
              >
                {price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectPrice;
