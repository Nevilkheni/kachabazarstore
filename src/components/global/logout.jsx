"use client";

import { clearUser } from "@/app/redux/userSlice";
import { showToast } from "./toast";
import { logoutUser } from "../../app/api/getProducts";

export const handleLogout = async (dispatch) => {
  try {
    const success = await logoutUser();

    if (!success) throw new Error("API failed");

    dispatch(clearUser());

    showToast({
      type: "success",
      title: "Logged out",
      message: "You’ve been logged out successfully",
      duration: 1000,
    });

    setTimeout(() => {
      window.location.href = "/Auth/login";
    }, 100);
  } catch (err) {
    console.log("Logout error:", err);

    showToast({
      type: "error",
      title: "Logout failed",
      message: "Something went wrong",
    });
  }
};
