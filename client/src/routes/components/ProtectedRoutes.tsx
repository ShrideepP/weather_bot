import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
  children: JSX.Element;
};

export default function ProtectedRoutes({
  children
} : ProtectedRoutesProps) {
  const [cookies, _] = useCookies();
  
  if(!cookies?.token) {
    return <Navigate to="/" />
  } return children;
};
