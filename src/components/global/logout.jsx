"use client";

import { clearUser } from "@/app/redux/userSlice";

export const handleLogout = async (dispatch) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "GET",
      credentials: "include",
    });

    dispatch(clearUser());

    window.location.href = "/Auth/login";
  } catch (err) {
    console.log("Logout error:", err);
  }
};
