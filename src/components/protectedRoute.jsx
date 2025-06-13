import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
    const token = localStorage.getItem("accessToken");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // Jika belum login, redirect ke login
    if (!token || !userInfo) {
        return <Navigate to="/login" replace />;
    }

    // Jika role tidak sesuai, redirect ke unauthorized
    if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Jika lolos semua, tampilkan halaman
    return children;
}