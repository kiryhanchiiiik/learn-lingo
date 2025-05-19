import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import Modal from "../Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

import sprite from "../../img/sprite.svg";
import css from "./Header.module.scss";

import type { RootState, AppDispatch } from "../../redux/store";
import { logoutUser } from "../../redux/auth/authOps";

const buildLinkClass = ({ isActive }: { isActive: boolean }) =>
  clsx(css.link, isActive && css.active);

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.auth.user);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => setIsModalOpen(true);
  const closeRegisterModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className={css.header}>
      <div className={css.wrapper}>
        <div className={css.logoContainer}>
          <a href="#" className={css.logo}>
            <svg width={28} height={28}>
              <use href={`${sprite}#ukraine`} />
            </svg>
            LearnLingo
          </a>
        </div>

        <nav className={css.linkWrapper}>
          <NavLink className={buildLinkClass} to="/">
            Home
          </NavLink>
          <NavLink className={buildLinkClass} to="/teachers">
            Teachers
          </NavLink>
          {user && (
            <NavLink className={buildLinkClass} to="/favorites">
              Favorites
            </NavLink>
          )}
        </nav>

        <div className={css.btnWrapper}>
          {user ? (
            <>
              <p className={css.greeting}>Hello, {user.displayName}!</p>
              <button
                className={css.logoutBtn}
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className={css.loginBtn}
                type="button"
                onClick={openLoginModal}
              >
                <svg width={20} height={20}>
                  <use href={`${sprite}#login`} />
                </svg>
                Log in
              </button>
              <button
                className={css.regBtn}
                type="button"
                onClick={openRegisterModal}
              >
                Registration
              </button>
            </>
          )}
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={closeRegisterModal}>
          <h2 className={css.regTitle}>Registration</h2>
          <p className={css.regSubTitle}>
            Thank you for your interest! Please provide the information below.
          </p>
          <RegisterForm onSuccess={closeRegisterModal} />
        </Modal>
      )}

      {isLoginModalOpen && (
        <Modal onClose={closeLoginModal}>
          <h2 className={css.regTitle}>Log In</h2>
          <p className={css.regSubTitle}>
            Welcome back! Please log in to your account.
          </p>
          <LoginForm onSuccess={closeLoginModal} />
        </Modal>
      )}
    </header>
  );
};

export default Header;
