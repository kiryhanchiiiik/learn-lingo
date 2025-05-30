import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import css from "./LoginForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/authOps";
import type { AppDispatch, RootState } from "../../redux/store";
import { useState } from "react";
import sprite from "../../img/sprite.svg";
import { toast } from "react-toastify";

interface LoginFormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid format")
    .required("Required!"),
  password: Yup.string().min(8, "Too short!").required("Required!"),
});

const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.auth.error);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await dispatch(loginUser(data.email, data.password));
      reset();
      onSuccess();
    } catch (err) {
      console.error("Login error:", err);

      toast.error("Incorrect email or password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        closeOnClick: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div>
        <div className={css.labelWrapper}>
          <label htmlFor="email">Email</label>
          {errors.email && (
            <span className={css.error}>{errors.email.message}</span>
          )}
        </div>
        <input
          className={css.input}
          type="email"
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
          className={css.input}
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

      {error && <div className={css.error}>{error}</div>}

      <button className={css.registerBtn} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
};

export default LoginForm;
