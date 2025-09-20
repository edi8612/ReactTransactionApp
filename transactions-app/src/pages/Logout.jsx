import { redirect } from "react-router-dom";

export async function action() {
  await fetch("http://localhost:8080/api/logout", {
    method: "POST",
    credentials: "include",
  }).catch(() => {});
 
  return redirect("/auth?mode=login");
}
