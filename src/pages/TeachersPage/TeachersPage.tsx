import css from "./TeachersPage.module.scss";
import sprite from "../../img/sprite.svg";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import FilterForm from "../../components/FilterForm/FilterForm";

interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

interface Teacher {
  avatar_url: string;
  name: string;
  surname: string;
  lessons_done: number;
  rating: number;
  price_per_hour: number;
  languages: string;
  lesson_info: string;
  conditions: string;
  moreInfo: string;
  reviews: Review[];
  levels: string[];
}

const TeachersPage = () => {
  const [showMore, setShowMore] = useState<number | null>(null);
  const [teachers, setTeachers] = useState<null | Teacher[]>(null);
  const [favoriteIndexes, setFavoriteIndexes] = useState<Set<number>>(
    new Set()
  );

  const toggleReadMore = (index: number): void => {
    setShowMore((prev) => (prev === index ? null : index));
  };

  const toggleFavorite = (index: number): void => {
    setFavoriteIndexes((prev) => {
      const updated = new Set(prev);
      if (updated.has(index)) {
        updated.delete(index);
      } else {
        updated.add(index);
      }
      return updated;
    });
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axiosInstance.get("/teachers.json");
        setTeachers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTeachers();
  }, []);

  return (
    <section className={css.teachers}>
      <FilterForm />
      <ul className={css.teachersContainer}>
        {teachers &&
          teachers.map((teacher, index) => (
            <li key={index}>
              <div className={css.teachersItem}>
                <div className={css.photoWrapper}>
                  <img
                    className={css.teacherImg}
                    src={teacher.avatar_url}
                    alt={teacher.name}
                  />
                  <span className={css.status}>
                    <svg width={12} height={12}>
                      <use href={`${sprite}#online`}></use>
                    </svg>
                  </span>
                </div>
                <div className={css.descWrapper}>
                  <div className={css.teacherDesc}>
                    <div className={css.teacherName}>
                      <p>Languages</p>
                      <h3>
                        {teacher.name} {teacher.surname}
                      </h3>
                    </div>
                    <div className={css.teacherAchieve}>
                      <p className={css.flexGap}>
                        <span>
                          <svg width={16} height={16}>
                            <use href={`${sprite}#book`}></use>
                          </svg>
                        </span>
                        Lessons online
                      </p>
                      <span className={css.line}></span>
                      <p>Lessons done: {teacher.lessons_done}</p>
                      <span className={css.line}></span>
                      <p className={css.flexGap}>
                        <span>
                          <svg width={16} height={16}>
                            <use href={`${sprite}#star`}></use>
                          </svg>
                        </span>
                        Rating: {teacher.rating}
                      </p>
                      <span className={css.line}></span>
                      <p>
                        Price / 1 hour:{" "}
                        <span className={css.priceColor}>
                          {teacher.price_per_hour}$
                        </span>
                      </p>
                    </div>
                    <div className={css.ImgHeart}>
                      {
                        <button
                          type="button"
                          onClick={() => toggleFavorite(index)}
                        >
                          <svg width={27} height={27}>
                            <use
                              href={`${sprite}#${
                                favoriteIndexes.has(index)
                                  ? "filled-heart"
                                  : "heart"
                              }`}
                            ></use>
                          </svg>
                        </button>
                      }
                    </div>
                  </div>
                  <div className={css.teacherInfo}>
                    <div className={css.teacherInfoContainer}>
                      <span className={css.spanWord}>Speaks:</span>
                      <p className={css.infoDescPhUnderline}>
                        {`${teacher.languages}`.replace(/, */g, ", ")}
                      </p>
                    </div>
                    <div className={css.teacherInfoContainer}>
                      <span className={css.spanWord}>Lesson Info:</span>
                      <p className={css.infoWrapper}>{teacher.lesson_info}</p>
                    </div>
                    <div className={css.teacherInfoContainer}>
                      <span className={css.spanWord}>Conditions:</span>
                      <p className={css.infoWrapper}>{teacher.conditions}</p>
                    </div>
                    {showMore !== index && (
                      <a
                        className={css.readMoreBtn}
                        onClick={() => toggleReadMore(index)}
                      >
                        Read more
                      </a>
                    )}
                    {showMore === index && (
                      <div className={css.moreInfo}>
                        <p className={css.moreInfoDesc}>{teacher.moreInfo}</p>
                        <ul className={css.moreInfoList}>
                          {teacher.reviews.map((review, index) => (
                            <li key={index}>
                              <div className={css.moreInfoItem}>
                                <div>
                                  <span className={css.spanWord}>
                                    {review.reviewer_name}
                                  </span>
                                  <p
                                    className={`${css.reviewContainer} ${css.infoWrapper}`}
                                  >
                                    <svg width={16} height={16}>
                                      <use href={`${sprite}#star`}></use>
                                    </svg>{" "}
                                    {review.reviewer_rating}.0
                                  </p>
                                </div>
                              </div>
                              <p
                                className={`${css.reviewComment} ${css.infoWrapper}`}
                              >
                                {review.comment}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className={css.langLvl}>
                    {teacher.levels.map((level, index) => (
                      <div
                        key={index}
                        className={`${css.lang} ${index === 0 ? css.blue : ""}`}
                      >
                        #{level}
                      </div>
                    ))}
                  </div>
                  {showMore === index && (
                    <div>
                      {" "}
                      <button type="button" className={css.bookBtn}>
                        Book trial lesson
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default TeachersPage;
