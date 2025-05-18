import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./RegisterForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/auth/authOps";
import type { RootState } from "../redux/store";

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

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(20, "Too Long!")
    .required("Required!"),
  email: Yup.string()
    .email("Email must be a valid format")
    .required("Required!"),
  password: Yup.string().min(8, "Too short!").required("Required"),
});

const RegisterForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.auth.error);

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        const { name, email, password } = values;
        await dispatch(registerUser(email, password, name) as any);

        resetForm();
        onSuccess();
      }}
    >
      <Form>
        <label className={css.label}>
          <ErrorMessage name="name" component="span" className={css.error} />
          <Field
            className={css.input}
            type="text"
            name="name"
            placeholder="Name"
          />
        </label>
        <label className={css.label}>
          <ErrorMessage name="email" component="span" className={css.error} />
          <Field
            className={css.input}
            type="email"
            name="email"
            placeholder="Email"
          />
        </label>
        <label className={css.label}>
          <ErrorMessage
            name="password"
            component="span"
            className={css.error}
          />
          <Field
            className={`${css.input} ${css.lastInput}`}
            type="password"
            name="password"
            placeholder="Password"
          />
        </label>
        <button className={css.registerBtn} type="submit">
          Sign Up
        </button>

        {error && <p className={css.error}>{error}</p>}
      </Form>
    </Formik>
  );
};

export default RegisterForm;
