import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./LoginForm.module.scss";

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
  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={LoginUserSchema}
      onSubmit={(values, { resetForm }) => {
        console.log("Login submitted:", values);
        resetForm();
        onSuccess();
      }}
    >
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
        <button className={css.registerBtn} type="submit">
          Log In
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
