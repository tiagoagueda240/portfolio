import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../lib/firebase";

export const AdminRoute = () => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!auth) {
      setStatus("unauth");
      return;
    }
    return onAuthStateChanged(auth, (user) =>
      setStatus(user ? "auth" : "unauth"),
    );
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#080810] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "unauth") return <Navigate to="/admin/login" replace />;
  return <Outlet />;
};
