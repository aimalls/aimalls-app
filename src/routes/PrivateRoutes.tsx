import { Route } from "react-router"
import { DashboardLayout } from "../layouts/dashboard/DashboardLayout"
import UserContextProvider from "../contexts/UserContext"
import { Products } from "../pages/products/Products"
import { AddNewProduct } from "../pages/products/AddNewProduct"
import AccountSetting from "../pages/account-settings/AccountSetting"
import AccountProfile from "../pages/account-settings/account-profile/AccountProfile"
import SetName from "../pages/account-settings/account-profile/SetName"
import SetPhoneNumber from "../pages/account-settings/account-profile/SetPhoneNumber"
import Addresses from "../pages/account-settings/addresses/Addresses"
import AddNewAddress from "../pages/account-settings/addresses/AddNewAddress"
// import { ProductPageLayout } from "../layouts/product/ProductPageLayout"

export const PrivateRoutes = () => {
    return (
        <UserContextProvider>
            <Route path="/dashboard">
                
                    <DashboardLayout />
            </Route>

            <Route path="/products">
                <Products />
            </Route>
            <Route path="/products/new">
                <AddNewProduct />
            </Route>

            <Route path="/account-settings">
                <AccountSetting />
            </Route>
            <Route path="/account-settings/profile">
                <AccountProfile />
            </Route>
            <Route path="/account-settings/profile/set-name">
                <SetName />
            </Route>
            <Route path="/account-settings/profile/set-phone">
                <SetPhoneNumber />
            </Route>

            
            <Route path="/account-settings/addresses">
                <Addresses />
            </Route>
            <Route path="/account-settings/addresses/add-new">
                <AddNewAddress />
            </Route>

        </UserContextProvider>
    )
}