import css from "./TeachersPage.module.scss";
import girl from "../../img/girlss.png";
import sprite from "../../img/sprite.svg";

const TeachersPage = () => {
  return (
    <section className={css.teachers}>
      <ul className={css.teachersContainer}>
        <li>
          <div className={css.teachersItem}>
            <div className={css.photoWrapper}>
              <img src={girl} alt="Teacher" />
            </div>
            <div className={css.descWrapper}>
              <div className={css.teacherDesc}>
                <div className={css.teacherName}>
                  <p>Languages</p>
                  <h3>Jane Smith</h3>
                </div>
                <div className={css.teacherAchieve}>
                  <p className={css.flexGap}>
                    <span>
                      {" "}
                      <svg width={16} height={16}>
                        <use href={`${sprite}#book`}></use>
                      </svg>
                    </span>
                    Lessons online
                  </p>
                  <span className={css.line}></span>
                  <p>Lessons done: 1098</p>
                  <span className={css.line}></span>
                  <p className={css.flexGap}>
                    {" "}
                    <span>
                      {" "}
                      <svg width={16} height={16}>
                        <use href={`${sprite}#star`}></use>
                      </svg>
                    </span>{" "}
                    Rating: 4.8
                  </p>
                  <span className={css.line}></span>
                  <p>
                    Price / 1 hour: <span className={css.priceColor}>30$</span>
                  </p>
                </div>
                <div className={css.ImgHeart}>
                  <button type="button">
                    <svg width={27} height={27}>
                      <use href={`${sprite}#heart`}></use>
                    </svg>
                  </button>
                </div>
              </div>
              <div className={css.teacherInfo}>
                <div className={css.teacherInfoContainer}>
                  <span className={css.spanWord}>Speaks:</span>
                  <p className={css.infoDescPhUnderline}>German, French</p>
                </div>
                <div className={css.teacherInfoContainer}>
                  <span className={css.spanWord}>Lesson Info:</span>
                  <p className={css.infoWrapper}>
                    Lessons are structured to cover grammar, vocabulary, and
                    practical usage of the language.
                  </p>
                </div>
                <div className={css.teacherInfoContainer}>
                  <span className={css.spanWord}>Conditions:</span>
                  <p className={css.infoWrapper}>
                    Welcomes both adult learners and teenagers (13 years and
                    above).Provides personalized study plans
                  </p>
                </div>
                <a className={css.readMoreBtn}>Read more</a>
              </div>
              <div className={css.langLvl}>
                <div className={`${css.lang} ${css.blue}`}>#A1 Beginner</div>
                <div className={css.lang}>#A2 Elementary</div>
                <div className={css.lang}>#B1 Intermediate</div>
                <div className={css.lang}>#B2 Upper-Intermediate</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default TeachersPage;
