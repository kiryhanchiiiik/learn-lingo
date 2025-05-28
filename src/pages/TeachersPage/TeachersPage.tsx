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
import Modal from "../../components/Modal/Modal";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

interface BookScheme {
  reason: string;
  name: string;
  email: string;
  phone: string;
}

const validationSchema = Yup.object().shape({
  reason: Yup.string().required("Please select a reason"),
  name: Yup.string()
    .min(3, "Too short!")
    .max(20, "Too long!")
    .required("Required!"),
  email: Yup.string()
    .email("Email must be a valid format")
    .required("Required!"),
  phone: Yup.string()
    .matches(/^\+?[0-9\s\-]{7,15}$/, "Enter a valid phone number")
    .required("Required!"),
});

const TeachersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showMore, setShowMore] = useState<number | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<BookScheme>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      reason: "",
      name: "",
      email: "",
      phone: "",
    },
  });

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

  const handleBookClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const onSubmit = async (data: BookScheme) => {
    try {
      console.log("Booking data", data);
      toast.success("Booking successful!");
      reset();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to book lesson");
    }
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
              onBookClick={handleBookClick}
            />
          );
        })}
      </ul>

      {isModalOpen && selectedTeacher && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className={css.bookContainer}>
            <div className={css.bookDescContainer}>
              <h2 className={css.bookTrialTitle}>Book trial lesson</h2>
              <p className={css.bookTrialSubTitle}>
                Our experienced tutor will assess your current language level,
                discuss your learning goals, and tailor the lesson to your
                specific needs.
              </p>
            </div>

            <div className={css.imageTextContainer}>
              <img
                className={css.avatar}
                width={44}
                height={44}
                src={selectedTeacher.avatar_url}
                alt={selectedTeacher.name}
              />
              <div className={css.teacherInfoContainer}>
                <p className={css.teacherName}>Your teacher</p>
                <p className={css.teacherNameSurname}>
                  {selectedTeacher.name} {selectedTeacher.surname}
                </p>
              </div>
            </div>

            <div className={css.radioContainer}>
              <h2>What is your main reason for learning English?</h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="reason"
                  control={control}
                  render={({ field }) => (
                    <div className={css.radioGroup}>
                      {[
                        "Career and business",
                        "Lesson for kids",
                        "Living abroad",
                        "Exams and coursework",
                        "Culture, travel or hobby",
                      ].map((option) => (
                        <label key={option} className={css.radioLabel}>
                          <input
                            type="radio"
                            value={option}
                            checked={field.value === option}
                            onChange={() => field.onChange(option)}
                          />
                          <span className={css.customRadio}>
                            <span className={css.radioDot}></span>
                          </span>
                          <span className={css.radioText}>{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                />
                {errors.reason && (
                  <p className={css.error}>{errors.reason.message}</p>
                )}

                <div className={css.formGroup}>
                  <div className={css.labelWrapper}>
                    <label>Name</label>
                    {errors.name && (
                      <span className={css.error}>{errors.name.message}</span>
                    )}
                  </div>
                  <input
                    id="name"
                    className={css.input}
                    type="text"
                    {...register("name")}
                    placeholder="Full Name"
                  />
                </div>

                <div>
                  <div className={css.labelWrapper}>
                    <label>Email</label>
                    {errors.email && (
                      <span className={css.error}>{errors.email.message}</span>
                    )}
                  </div>
                  <input
                    className={css.input}
                    type="text"
                    {...register("email")}
                    placeholder="Email"
                  />
                </div>

                <div className={css.lastInput}>
                  <div className={css.labelWrapper}>
                    <label>Phone</label>
                    {errors.phone && (
                      <span className={css.error}>{errors.phone.message}</span>
                    )}
                  </div>
                  <input
                    className={css.input}
                    type="text"
                    {...register("phone")}
                    placeholder="Phone number"
                  />
                </div>
                <button className={css.bookBtn} type="submit">
                  Book
                </button>
              </form>
            </div>
          </div>
        </Modal>
      )}

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
