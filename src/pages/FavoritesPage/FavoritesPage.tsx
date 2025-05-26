import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import type { Teacher } from "../../redux/favorites/favoritesSlice";
import { removeFavorite } from "../../redux/favorites/favoritesSlice";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import css from "./FavoritePage.module.scss";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const [showMore, setShowMore] = useState<number | null>(null);

  const toggleReadMore = (index: number): void => {
    setShowMore((prev) => (prev === index ? null : index));
  };

  const toggleFavorite = (teacher: Teacher): void => {
    if (!user || !user.email) return;
    dispatch(removeFavorite({ teacher, email: user.email }));
  };

  return (
    <section className={css.favorites}>
      {favorites.length === 0 ? (
        <div className={css.clearFav}>
          <h2>No Teachers Available</h2>
          <p>
            Sorry, there are currently no teachers that match your criteria.
          </p>
        </div>
      ) : (
        <ul className={css.teachersContainer}>
          {favorites.map((teacher, index) => (
            <TeacherCard
              key={index}
              teacher={teacher}
              index={index}
              showMore={showMore}
              toggleReadMore={toggleReadMore}
              toggleFavorite={toggleFavorite}
              isFavorite={true}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default FavoritesPage;
