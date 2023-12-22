import { Route, useHistory } from "react-router"
import { SplashScreen } from "../pages/SplashScreen"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import RegistrationSuccess from "../pages/auth/RegistrationSuccess"
import ForgotPassword from "../pages/auth/ForgotPassword"
import PasswordReset from "../pages/auth/PasswordReset"


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
            <Route exact path={"/forgot-password"} component={ForgotPassword}/>
            <Route exact path={"/password-reset/:email"} component={PasswordReset} />
        </>
        
    )
}
