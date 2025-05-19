import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import css from "./LoginForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/authOps";
import type { AppDispatch, RootState } from "../../redux/store";

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
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <label className={css.label}>
        {errors.email && (
          <span className={css.error}>{errors.email.message}</span>
        )}
        <input
          className={css.input}
          type="email"
          {...register("email")}
          placeholder="Email"
        />
      </label>

      <label className={css.label}>
        {errors.password && (
          <span className={css.error}>{errors.password.message}</span>
        )}
        <input
          className={css.input}
          type="password"
          {...register("password")}
          placeholder="Password"
        />
      </label>

      {error && <div className={css.error}>{error}</div>}

      <button className={css.registerBtn} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
};

export default LoginForm;
