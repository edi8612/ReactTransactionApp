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
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      {data && data.message && <p>{data.message}</p>}
      <p>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </p>
      <p>
        <label htmlFor="">Password</label>
        <input type="password" id="password" name="password" />
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
