import { Route, useHistory } from "react-router"
import { SplashScreen } from "../pages/SplashScreen"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import RegistrationSuccess from "../pages/auth/RegistrationSuccess"


export const PublicRoutes = () => {
    
    return(
        
        <>
            <Route exact path="/">
                <SplashScreen />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/register">
                <Register />
            </Route>
            <Route exact path="/register-success">
                <RegistrationSuccess />
            </Route>
        </>
        
    )
}
