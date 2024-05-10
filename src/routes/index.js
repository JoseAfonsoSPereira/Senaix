import { useAuth } from "../context/useAuth";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import React from "react";


const Routes = () => {
    const {user} = useAuth();
    return user ? <AppRoutes/> : <AuthRoutes/>;
};

export default Routes;

