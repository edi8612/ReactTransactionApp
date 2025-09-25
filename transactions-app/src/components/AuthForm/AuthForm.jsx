import {
  Form,
  useNavigation,
  useSearchParams,
  Link,
  useActionData,
} from "react-router-dom";

import styles from "./AuthForm.module.css";

function AuthForm() {
  const data = useActionData();
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form
      method="post"
      action={`?mode=${isLogin ? "login" : "signup"}`}
      className={styles.form}
    >
      <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
      {data?.message && <div className={styles.errorBox}>{data.message}</div>}

      <p>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          aria-invalid={Boolean(data?.errors?.email) || undefined}
          aria-describedby={data?.errors?.email ? "email-error" : undefined}
        />

        {data?.errors?.email && (
          <span id="email-error" className={styles.fieldError}>
            {data.errors.email}
          </span>
        )}
      </p>
      <p>
        <label htmlFor="">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          aria-invalid={Boolean(data?.errors?.password) || undefined}
          aria-describedby={
            data?.errors?.password ? "password-error" : undefined
          }
        />
        {data?.errors?.password && (
          <span id="password-error" className={styles.fieldError}>
            {data.errors.password}
          </span>
        )}
      </p>
      <div className={styles.actions}>
        <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
          {isLogin ? "Create a new user" : "Login"}
        </Link>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default AuthForm;
