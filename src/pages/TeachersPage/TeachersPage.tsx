import css from "./TeachersPage.module.scss";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import FilterForm from "../../components/FilterForm/FilterForm";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import {
  addFavorite,
  removeFavorite,
} from "../../redux/favorites/favoritesSlice";
import TeacherCard from "../../components/TeacherCard/TeacherCard";

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
  const [visibleCount, setVisibleCount] = useState(4);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const favorites = useSelector((state: RootState) => state.favorites.items);

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

  const toggleFavorite = (teacher: Teacher): void => {
    if (!user) {
      alert("Only authorized users can add to favorites.");
      return;
    }

    const isAlreadyFavorite = favorites.some(
      (fav) => fav.name === teacher.name && fav.surname === teacher.surname
    );

    if (isAlreadyFavorite) {
      dispatch(removeFavorite(teacher));
    } else {
      dispatch(addFavorite(teacher));
    }
  };

  const toggleReadMore = (index: number): void => {
    setShowMore((prev) => (prev === index ? null : index));
  };

  const loadMore = () => setVisibleCount((prev) => prev + 4);

  return (
    <section className={css.teachers}>
      <FilterForm />
      <ul className={css.teachersContainer}>
        {teachers &&
          teachers.slice(0, visibleCount).map((teacher, index) => {
            const isFavorite = favorites.some(
              (fav) =>
                fav.name === teacher.name && fav.surname === teacher.surname
            );

            return (
              <TeacherCard
                key={index}
                teacher={teacher}
                index={index}
                showMore={showMore}
                toggleReadMore={toggleReadMore}
                toggleFavorite={() => toggleFavorite(teacher)}
                isFavorite={isFavorite}
              />
            );
          })}
      </ul>

      {teachers && visibleCount < teachers.length && (
        <div className={css.loadMoreWrapper}>
          <button className={css.loadMoreBtn} onClick={loadMore}>
            Load more
          </button>
        </div>
      )}
    </section>
  );
};

export default TeachersPage;
