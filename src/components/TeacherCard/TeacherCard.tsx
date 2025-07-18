import sprite from "../../img/sprite.svg";
import css from "./TeacherCard.module.scss";

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

interface Props {
  teacher: Teacher;
  index: number;
  showMore: number | null;
  toggleReadMore: (index: number) => void;
  toggleFavorite: (teacher: Teacher, index: number) => void;
  isFavorite: boolean;
  onBookClick: (teacher: Teacher) => void;
}

const TeacherCard = ({
  teacher,
  index,
  showMore,
  toggleReadMore,
  toggleFavorite,
  onBookClick,
  isFavorite,
}: Props) => {
  return (
    <li className={css.teachersContainerItem}>
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
              <button
                type="button"
                onClick={() => toggleFavorite(teacher, index)}
              >
                <svg width={27} height={27}>
                  <use
                    href={`${sprite}#${isFavorite ? "filled-heart" : "heart"}`}
                  ></use>
                </svg>
              </button>
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
              <button
                className={css.readMoreBtn}
                onClick={() => toggleReadMore(index)}
              >
                Read more
              </button>
            )}
            {showMore === index && (
              <div className={css.moreInfo}>
                <p className={css.moreInfoDesc}>{teacher.moreInfo}</p>
                <ul className={css.moreInfoList}>
                  {teacher.reviews.map((review, idx) => (
                    <li key={idx}>
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
                      <p className={`${css.reviewComment} ${css.infoWrapper}`}>
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
              <button
                type="button"
                className={css.bookBtn}
                onClick={() => onBookClick(teacher)}
              >
                Book trial lesson
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default TeacherCard;
