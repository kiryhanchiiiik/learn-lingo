import SelectLanguage from "../SelectLanguage/SelectLanguage";
import SelectLevel from "../SelectLevel/SelectLevel";
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
    </ul>
  );
};

export default FilterForm;
