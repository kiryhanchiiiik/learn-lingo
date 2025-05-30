import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Teacher } from "../../redux/favorites/favoritesSlice";
import { selectUser } from "../../redux/auth/selectors";
import { removeFavorite } from "../../redux/favorites/favoritesSlice";
import { selectFavorite } from "../../redux/favorites/selectors";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import Modal from "../../components/Modal/Modal";
import BookingModal from "../../components/BookingModal/BookingModal";
import css from "./FavoritePage.module.scss";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const favorites = useSelector(selectFavorite);
  const [showMore, setShowMore] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const toggleReadMore = (index: number): void => {
    setShowMore((prev) => (prev === index ? null : index));
  };

  const toggleFavorite = (teacher: Teacher): void => {
    if (!user || !user.email) return;
    dispatch(removeFavorite({ teacher, email: user.email }));
  };

  const handleBookClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
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
              onBookClick={handleBookClick}
              isFavorite={true}
            />
          ))}

          {isModalOpen && selectedTeacher && (
            <Modal onClose={() => setIsModalOpen(false)}>
              <div className={css.bookContainer}>
                <div className={css.bookDescContainer}>
                  <h2>Book trial lesson</h2>
                  <p>
                    Our experienced tutor will assess your current language
                    level, discuss your learning goals, and tailor the lesson to
                    your specific needs.
                  </p>
                </div>
                <div>
                  <img
                    style={{ borderRadius: "100px" }}
                    width={44}
                    height={44}
                    src={selectedTeacher.avatar_url}
                    alt={selectedTeacher.name}
                  />
                </div>
              </div>
            </Modal>
          )}
        </ul>
      )}

      {isModalOpen && selectedTeacher && (
        <BookingModal
          teacher={selectedTeacher}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};

export default FavoritesPage;
