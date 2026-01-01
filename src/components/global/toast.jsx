"use client";
import { useEffect, useState } from "react";

let showToastGlobal;

export function showToast(data) {
  showToastGlobal?.(data);
}

export default function Toast() {
  const [toast, setToast] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    showToastGlobal = (data) => {
      setToast(data);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
        setTimeout(() => setToast(null), 300);
      }, data?.duration || 3000);
    };
  }, []);

  if (!toast) return null;

  const isError = toast.type === "error";

  return (
    <div className="fixed mx-5 top-6 left-1/2 -translate-x-1/2 z-9999">
      <div
        className={`
          relative w-[360px] bg-white rounded-xl shadow-xl overflow-hidden
          transition-all duration-300 ease-out
          ${visible ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"}
        `}
      >
        <div className="flex gap-3 p-4">
          <div
            className={`mt-1 h-3 w-3 rounded-full ${isError ? "bg-red-500" : "bg-green-500"
              }`}
          />

          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{toast.title}</p>
            <p className="text-gray-600 text-sm">{toast.message}</p>
          </div>

          <button
            onClick={() => setVisible(false)}
            className="text-gray-400 hover:text-gray-700 text-lg leading-none"
          >
            ×
          </button>
        </div>

        <div
          className={`absolute bottom-0 left-0 h-[3px]
            ${isError ? "bg-red-500" : "bg-green-500"}
            animate-toast-progress
          `}
          style={{
            animationDuration: `${toast.duration || 2000}ms`,
          }}
        />
      </div>
    </div>
  );
}
