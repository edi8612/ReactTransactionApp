import { redirect } from "react-router-dom";
import { API } from "../lib/endpoints";

export async function action() {
  // await fetch("https://localhost:7170/api/auth/logout", {
  //   method: "POST",
  //   credentials: "include",
  // }).catch(() => {});

  await apiFetch(API.auth.logout, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    
  return redirect("/auth?mode=login");
}
