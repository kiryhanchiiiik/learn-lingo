import css from "./Header.module.scss";
import sprite from "../../img/sprite.svg";

const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.wrapper}>
        <div className={css.logoContainer}>
          <a href="#" className={css.logo}>
            <svg width={28} height={28}>
              <use href={`${sprite}#ukraine`}></use>
            </svg>
            LearnLingo
          </a>
        </div>
        <div className={css.linkWrapper}>
          <a href="#">Home</a>
          <a href="#">Teachers</a>
        </div>
        <div className={css.btnWrapper}>
          <button className={css.loginBtn} type="button">
            <svg width={20} height={20}>
              <use href={`${sprite}#login`}></use>
            </svg>
            Log in
          </button>
          <button className={css.regBtn} type="button">
            Registration
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
