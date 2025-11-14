"use client";

import React from "react";

const typeStyles = {
  success: "bg-emerald-600 border-emerald-500",
  error: "bg-red-600 border-red-500",
  info: "bg-slate-800 border-slate-700",
};

const CustomToast = ({ open, type = "info", message, onClose }) => {
  if (!open || !message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div
        className={`max-w-sm rounded-2xl border px-4 py-3 text-sm text-white shadow-xl shadow-black/20 ${
          typeStyles[type] || typeStyles.info
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            {type === "success" && (
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-xs">
                ✓
              </span>
            )}
            {type === "error" && (
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-xs">
                !
              </span>
            )}
            {type === "info" && (
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-xs">
                i
              </span>
            )}
          </div>
          <p className="flex-1 leading-snug">{message}</p>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 text-xs uppercase tracking-wide text-white/70 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomToast;
