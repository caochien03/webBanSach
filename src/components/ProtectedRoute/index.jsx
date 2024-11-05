import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermited from "./NotPermited";

const RoleBaseRoute = (props) => {
    const isAdminRoutes = window.location.pathname.startsWith("/admin");
    const user = useSelector((state) => state.account.user);
    const userRole = user.role;

    if (isAdminRoutes && userRole === "ADMIN") {
        return <>{props.children}</>;
    } else {
        return <NotPermited />;
    }
};

const ProtectedRoute = (props) => {
    const isAuthenticated = useSelector(
        (state) => state.account.isAuthenticated
    );

    return (
        <>
            {isAuthenticated === true ? (
                <RoleBaseRoute>{props.children}</RoleBaseRoute>
            ) : (
                <Navigate to="/login" replace />
            )}
        </>
    );
};

export default ProtectedRoute;
