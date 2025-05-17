import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import Modal from "../Modal/Modal";

import sprite from "../../img/sprite.svg";
import css from "./Header.module.scss";

const buildLinkClass = ({ isActive }: { isActive: boolean }) => {
  return clsx(css.link, isActive && css.active);
};

interface RegistrationFormValues {
  name: string;
  email: string;
  password: string;
}

const INITIAL_VALUES: RegistrationFormValues = {
  name: "",
  email: "",
  password: "",
};

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const RegisterUserSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too short!")
      .max(20, "Too Long!")
      .required("Required!"),
    email: Yup.string()
      .email("Email must be a valid format")
      .required("Required!"),
    password: Yup.string().min(8, "Too short!").required("Required"),
  });

  return (
    <header className={css.header}>
      <div className={css.wrapper}>
        <div className={css.logoContainer}>
          <a href="#" className={css.logo}>
            <svg width={28} height={28}>
              <use href={`${sprite}#ukraine`}></use>
            </svg>
            LearnLingo
          </a>
        </div>
        <div className={css.linkWrapper}>
          <NavLink className={buildLinkClass} to="/">
            Home
          </NavLink>
          <NavLink className={buildLinkClass} to="/teachers">
            Teachers
          </NavLink>
        </div>
        <div className={css.btnWrapper}>
          <button className={css.loginBtn} type="button">
            <svg width={20} height={20}>
              <use href={`${sprite}#login`}></use>
            </svg>
            Log in
          </button>
          <button className={css.regBtn} type="button" onClick={openModal}>
            Registration
          </button>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2 className={css.regTitle}>Registration</h2>
          <p className={css.regSubTitle}>
            Thank you for your interest in our platform! In order to register,
            we need some information. Please provide us with the following
            information
          </p>

          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={RegisterUserSchema}
          >
            <Form>
              {/* Field for name */}
              <label className={css.label}>
                <ErrorMessage
                  className={css.error}
                  name="name"
                  component="span"
                />
                <Field
                  className={css.input}
                  type="text"
                  name="name"
                  placeholder="Name"
                />
              </label>

              {/* Field for email */}
              <label className={css.label}>
                <ErrorMessage
                  className={css.error}
                  name="email"
                  component="span"
                />
                <Field
                  className={css.input}
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </label>

              {/* Field for password */}
              <label className={css.label}>
                <ErrorMessage
                  className={css.error}
                  name="password"
                  component="span"
                />
                <Field
                  className={`${css.input} ${css.lastInput}`}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </label>

              {/* Submit button */}
              <button className={css.registerBtn} type="submit">
                Sign Up
              </button>
            </Form>
          </Formik>
        </Modal>
      )}
    </header>
  );
};

export default Header;
