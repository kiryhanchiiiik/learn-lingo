import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "./redux/store";

type ProtectedRouteProps = {
  component: Element;
  redirectTo?: string;
};

const ProtectedRoute = ({
  component,
  redirectTo = "/",
}: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return user ? component : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
