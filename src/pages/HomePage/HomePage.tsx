import css from "./HomePage.module.scss";
import girl from "../../img/girl.png";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <section className={css.home}>
      <div className={css.wrapper}>
        <div className={css.textContainer}>
          <h1>
            Unlock your potential with the best{" "}
            <span className={css.spanRelative}>
              <span className={css.block}></span>
              <span className={css.span}>language</span>
            </span>{" "}
            tutors
          </h1>
          <p>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <NavLink className={css.homeBtn} to="/teachers">
            Get started
          </NavLink>
        </div>
        <div className={css.imgContainer}>
          <img src={girl} alt={girl} />
        </div>
      </div>
      <ul className={css.list}>
        <li>
          <h2>32,000 +</h2>
          <p>Experienced tutors</p>
        </li>
        <li>
          <h2>300,000 +</h2>
          <p>5-star tutor reviews</p>
        </li>
        <li>
          <h2>120 +</h2>
          <p>Subjects taught</p>
        </li>
        <li>
          <h2>200 +</h2>
          <p>Tutor nationalities</p>
        </li>
      </ul>
    </section>
  );
};

export default HomePage;
