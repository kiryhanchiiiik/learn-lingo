import { useEffect, useState } from "react";
import type { RootState } from "../../redux/store";
import { axiosInstance } from "../../api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import FilterForm from "../../components/FilterForm/FilterForm";
import {
  addFavorite,
  removeFavorite,
  setFavorites,
} from "../../redux/favorites/favoritesSlice";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import css from "./TeachersPage.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { toast, Bounce } from "react-toastify";

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
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const favorites = useSelector((state: RootState) => state.favorites.items);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axiosInstance.get<Teacher[]>("/teachers.json");
        setTeachers(response.data);
      } catch (err) {
        console.error("Failed to fetch teachers", err);
      }
    };
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (user?.email) {
      const favStr = localStorage.getItem(`favorites_${user.email}`);
      if (favStr) {
        try {
          const favItems: Teacher[] = JSON.parse(favStr);
          dispatch(setFavorites({ items: favItems }));
        } catch (e) {
          console.error("Failed to parse favorites from localStorage", e);
          dispatch(setFavorites({ items: [] }));
        }
      } else {
        dispatch(setFavorites({ items: [] }));
      }
    } else {
      dispatch(setFavorites({ items: [] }));
    }
  }, [user, dispatch]);

  const toggleFavorite = (teacher: Teacher) => {
    if (!user?.email) {
      return toast.error("You need to be logged in to add favorites", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    const isAlreadyFavorite = favorites.some(
      (fav) => fav.name === teacher.name && fav.surname === teacher.surname
    );

    if (isAlreadyFavorite) {
      dispatch(removeFavorite({ teacher, email: user.email }));
    } else {
      dispatch(addFavorite({ teacher, email: user.email }));
    }
  };

  const toggleReadMore = (index: number) => {
    setShowMore((prev) => (prev === index ? null : index));
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <section className={css.teachers}>
      <FilterForm />
      <ul className={css.teachersContainer}>
        {teachers.slice(0, visibleCount).map((teacher, index) => {
          const isFavorite = favorites.some(
            (fav) =>
              fav.name === teacher.name && fav.surname === teacher.surname
          );

          return (
            <TeacherCard
              key={`${teacher.name}-${teacher.surname}`}
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

      {visibleCount < teachers.length && (
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
