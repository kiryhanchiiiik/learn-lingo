import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./LoginForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/authOps";
import type { AppDispatch, RootState } from "../../redux/store";

interface LoginFormValues {
  email: string;
  password: string;
}

const INITIAL_VALUES: LoginFormValues = {
  email: "",
  password: "",
};

const LoginUserSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid format")
    .required("Required!"),
  password: Yup.string().min(8, "Too short!").required("Required"),
});

const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.auth.error);

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={LoginUserSchema}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        try {
          await dispatch(loginUser(values.email, values.password));
          resetForm();
          onSuccess();
        } catch (err) {
          console.error("Login error:", err);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <label className={css.label}>
            <ErrorMessage className={css.error} name="email" component="span" />
            <Field
              className={css.input}
              type="email"
              name="email"
              placeholder="Email"
            />
          </label>
          <label className={css.label}>
            <ErrorMessage
              className={css.error}
              name="password"
              component="span"
            />
            <Field
              className={css.input}
              type="password"
              name="password"
              placeholder="Password"
            />
          </label>

          {error && <div className={css.error}>{error}</div>}

          <button
            className={css.registerBtn}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
