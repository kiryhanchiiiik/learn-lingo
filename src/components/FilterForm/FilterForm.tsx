import SelectLanguage from "../SelectLanguage/SelectLanguage";
import SelectLevel from "../SelectLevel/SelectLevel";
import SelectPrice from "../SelectPrice/SelectPrice";
import css from "./FilterForm.module.scss";

const FilterForm = ({
  selectedLanguage,
  selectedLevel,
  selectedPrice,
  onLanguageChange,
  onLevelChange,
  onPriceChange,
}: {
  selectedLanguage: string | null;
  selectedLevel: string | null;
  selectedPrice: string | null;
  onLanguageChange: (value: string | null) => void;
  onLevelChange: (value: string | null) => void;
  onPriceChange: (value: string | null) => void;
}) => {
  return (
    <ul className={css.filterContainer}>
      <li>
        <SelectLanguage
          selected={selectedLanguage}
          onChange={onLanguageChange}
        />
      </li>
      <li>
        <SelectLevel selected={selectedLevel} onChange={onLevelChange} />
      </li>
      <li>
        <SelectPrice selected={selectedPrice} onChange={onPriceChange} />
      </li>
    </ul>
  );
};

export default FilterForm;
