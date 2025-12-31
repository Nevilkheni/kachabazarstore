"use client";

import { clearUser } from "@/app/redux/userSlice";
import { showToast } from "./toast";

export const handleLogout = async (dispatch) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/auth/logout`, {
      method: "GET",
      credentials: "include",
    });

    dispatch(clearUser());

    showToast({
      type: "success",
      title: "Logged out",
      message: "You’ve been logged out successfully",
      duration: 1000,
    });

    setTimeout(() => {
      window.location.href = "/Auth/login";
    }, 500);
  } catch (err) {
    console.log("Logout error:", err);

    showToast({
      type: "error",
      title: "Logout failed",
      message: "Something went wrong",
    });
  }
};
