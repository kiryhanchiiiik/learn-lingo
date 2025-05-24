import SelectLanguage from "../SelectLanguage/SelectLanguage";
import SelectLevel from "../SelectLevel/SelectLevel";
import SelectPrice from "../SelectPrice/SelectPrice";
import css from "./FilterForm.module.scss";
const FilterForm = () => {
  return (
    <ul className={css.filterContainer}>
      <li>
        <SelectLanguage />
      </li>
      <li>
        <SelectLevel />
      </li>
      <li>
        <SelectPrice />
      </li>
    </ul>
  );
};

export default FilterForm;
