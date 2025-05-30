import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import css from "./BookingModal.module.scss";
import Modal from "../Modal/Modal";
import { toast } from "react-toastify";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../api/firebase";

interface BookScheme {
  reason: string;
  name: string;
  email: string;
  phone: string;
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
  levels: string[];
}
interface Props {
  teacher: Teacher;
  onClose: () => void;
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

const BookingModal = ({ teacher, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<BookScheme>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      reason: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: BookScheme) => {
    console.log(data);
    toast.success("Booking successful!");
    reset();
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className={css.bookContainer}>
        <div className={css.bookDescContainer}>
          <h2 className={css.bookTrialTitle}>Book trial lesson</h2>
          <p className={css.bookTrialSubTitle}>
            Our experienced tutor will assess your current language level,
            discuss your learning goals, and tailor the lesson to your specific
            needs.
          </p>
        </div>

        <div className={css.imageTextContainer}>
          <img
            className={css.avatar}
            src={teacher.avatar_url}
            alt={teacher.name}
          />
          <div className={css.teacherInfoContainer}>
            <p className={css.teacherName}>Your teacher</p>
            <p className={css.teacherNameSurname}>
              {teacher.name} {teacher.surname}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={css.radioContainer}>
            <h2>What is your main reason for learning English?</h2>
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
          </div>

          {errors.reason && (
            <p className={css.error}>{errors.reason.message}</p>
          )}

          <div className={css.formGroup}>
            <label>
              Name
              {errors.name && (
                <span className={css.error}> - {errors.name.message}</span>
              )}
            </label>
            <input
              className={css.input}
              {...register("name")}
              placeholder="Full Name"
            />
          </div>

          <div className={css.formGroup}>
            <label>
              Email
              {errors.email && (
                <span className={css.error}> - {errors.email.message}</span>
              )}
            </label>
            <input
              className={css.input}
              {...register("email")}
              placeholder="Email"
            />
          </div>

          <div className={css.formGroup}>
            <label>
              Phone
              {errors.phone && (
                <span className={css.error}> - {errors.phone.message}</span>
              )}
            </label>
            <input
              className={css.input}
              {...register("phone")}
              placeholder="Phone number"
            />
          </div>

          <button className={css.bookBtn} type="submit">
            Book
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default BookingModal;
