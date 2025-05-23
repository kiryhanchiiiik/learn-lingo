import css from "./TeachersPage.module.scss";
import girl from "../../img/girlss.png";
import frank from "../../img/frank.png";
import sprite from "../../img/sprite.svg";
import { useState } from "react";

const TeachersPage = () => {
  const [showMore, setShowMore] = useState<boolean>(false);

  const toggleReadMore = (): void => {
    setShowMore((prev) => !prev);
  };

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
                {!showMore && (
                  <a className={css.readMoreBtn} onClick={toggleReadMore}>
                    Read more
                  </a>
                )}
                {showMore && (
                  <div className={css.moreInfo}>
                    <p className={css.moreInfoDesc}>
                      Jane is an experienced and dedicated language teacher
                      specializing in German and French. She holds a Bachelor's
                      degree in German Studies and a Master's degree in French
                      Literature. Her passion for languages and teaching has
                      driven her to become a highly proficient and knowledgeable
                      instructor. With over 10 years of teaching experience,
                      Jane has helped numerous students of various backgrounds
                      and proficiency levels achieve their language learning
                      goals. She is skilled at adapting her teaching methods to
                      suit the needs and learning styles of her students,
                      ensuring that they feel supported and motivated throughout
                      their language journey.
                    </p>
                    <ul className={css.moreInfoList}>
                      <li>
                        <div className={css.moreInfoItem}>
                          <img src={frank} alt={frank} />
                          <div>
                            <span className={css.spanWord}>Frank</span>
                            <p
                              className={`${css.reviewContainer} ${css.infoWrapper}`}
                            >
                              <svg width={16} height={16}>
                                <use href={`${sprite}#star`}></use>
                              </svg>{" "}
                              4.0
                            </p>
                          </div>
                        </div>
                        <p
                          className={`${css.reviewComment} ${css.infoWrapper}`}
                        >
                          Jane's lessons were very helpful. I made good
                          progress.
                        </p>
                      </li>
                      <li>
                        <div className={css.moreInfoItem}>
                          <img src={frank} alt={frank} />
                          <div>
                            <span className={css.spanWord}>Frank</span>
                            <p
                              className={`${css.reviewContainer} ${css.infoWrapper}`}
                            >
                              <svg width={16} height={16}>
                                <use href={`${sprite}#star`}></use>
                              </svg>{" "}
                              4.0
                            </p>
                          </div>
                        </div>
                        <p
                          className={`${css.reviewComment} ${css.infoWrapper}`}
                        >
                          Jane's lessons were very helpful. I made good
                          progress.
                        </p>
                      </li>
                    </ul>
                  </div>
                )}
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
