import { Form, useNavigation, useSearchParams, Link } from "react-router-dom";

import styles from "./AuthForm.module.css";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" className={styles.form}>
      <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
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
        <button>Save</button>
      </div>
    </Form>
  );
}

export default AuthForm;
