import { redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm/AuthForm.jsx";
import { apiFetch } from "../lib/api";

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  if (mode !== "login" && mode !== "signup") {
    throw new Response(JSON.stringify({ message: "Unsupported mode." }), { status: 422 });
  }

  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());

  const path = mode === "login" ? "/login" : "/signup";
  const res = await apiFetch(path, { method: "POST", body: JSON.stringify(payload) });

  if (!res.ok) {
    // return an error for useActionData()
    return new Response(JSON.stringify(res.data ?? { message: "Auth failed" }), { status: res.status || 400 });
  }

  // Cookies are set by the server; we don’t store tokens locally for cookie-auth.
  return redirect("/");
}

export default function AuthenticationPage() {
  return <AuthForm />;
}
