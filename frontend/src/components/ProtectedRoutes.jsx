import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ children, roleRequired, publicRoute }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (publicRoute) return children;

  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  if (roleRequired && roleRequired !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoutes;
