"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setUser } from "@/app/redux/userSlice";

export default function Protected({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user.user);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (user) {
      setChecking(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/auth/user`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Not authenticated");

        const data = await res.json();
        if (data) {
          dispatch(setUser(data));
          setChecking(false);
          return;
        }

        throw new Error("No user");
      } catch (err) {
        router.replace("/Auth/login");
      }
    };

    checkAuth();
  }, [user, dispatch, router]);

  if (checking) return null;

  return children;
}
