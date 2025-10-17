import { redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm/AuthForm.jsx";
import { apiFetch } from "../lib/api";
import { API } from "../lib/endpoints.js";

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  if (mode !== "login" && mode !== "signup") {
    throw new Response(JSON.stringify({ message: "Unsupported mode." }), {
      status: 422,
    });
  }

  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());

  const path = mode === "login" ? API.auth.login : API.auth.signup;
  const res = await apiFetch(path, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const msg =
      res.data?.message ||
      (res.status === 401
        ? "Invalid email or password"
        : res.status === 409
        ? "Email already exists"
        : "Authentication failed");

    const errors = {};
    if (res.status === 401) errors.password = "Invalid email or password";
    if (res.status === 409) errors.email = "Email already exists";

    return { message: msg, errors }; 
  }

  return redirect("/");
}

export default function AuthenticationPage() {
  return <AuthForm />;
}
