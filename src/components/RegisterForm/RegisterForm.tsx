import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import css from "./RegisterForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth/authOps";
import type { RootState } from "../../redux/store";

import sprite from "../../img/sprite.svg";
import { useState } from "react";

interface RegistrationFormValues {
  name: string;
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(20, "Too long!")
    .required("Required!"),
  email: Yup.string()
    .email("Email must be a valid format")
    .required("Required!"),
  password: Yup.string().min(8, "Too short!").required("Required!"),
});

const RegisterForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.auth.error);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    const { name, email, password } = data;
    await dispatch(registerUser(email, password, name) as any);

    reset();
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className={css.labelWrapper}>
          <label htmlFor="name">Name</label>
          {errors.name && (
            <span className={css.error}>{errors.name.message}</span>
          )}
        </div>
        <input
          className={css.input}
          type="text"
          {...register("name")}
          placeholder="Name"
        />
      </div>

      <div>
        <div className={css.labelWrapper}>
          <label htmlFor="email">Email</label>
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

      <div className={css.label}>
        <div className={css.labelWrapper}>
          <label htmlFor="password">Password</label>
          {errors.password && (
            <span className={css.error}>{errors.password.message}</span>
          )}
        </div>
        <input
          className={`${css.input} ${css.lastInput}`}
          type={showPassword ? "text" : "password"}
          {...register("password")}
          placeholder="Password"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={css.eyeBtn}
          aria-label="Toggle password visibility"
        >
          <svg className={css.eyeIcon} width={25} height={25}>
            <use
              href={`${sprite}#${showPassword ? "icon-eye" : "icon-eye-off"}`}
            />
          </svg>
        </button>
      </div>

      {error && <p className={css.error}>{error}</p>}

      <button className={css.registerBtn} type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;
