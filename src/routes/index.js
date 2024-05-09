const Routes = () => {
    const {user} = useAuth();
    return user ? <AppRoutes/> : <AuthRoutes/>;
};

export default Routes;

