import { Route } from "react-router"
import { DashboardLayout } from "../layouts/shopper-dashboard/DashboardLayout"
import UserContextProvider from "../contexts/UserContext"
import { Products } from "../pages/products/Products"
import { AddNewProduct } from "../pages/products/AddNewProduct"
import AccountSetting from "../pages/account-settings/AccountSetting"
import AccountProfile from "../pages/account-settings/account-profile/AccountProfile"
import SetName from "../pages/account-settings/account-profile/SetName"
import SetPhoneNumber from "../pages/account-settings/account-profile/SetPhoneNumber"
import Addresses from "../pages/account-settings/addresses/Addresses"
import AddNewAddress from "../pages/account-settings/addresses/AddNewAddress"
import { UpdateProduct } from "../pages/products/UpdateProduct"
import Shop from "../pages/shop/Shop"
import ShopSearch from "../pages/shop/ShopSearch"
import { ViewProduct } from "../pages/products/ViewProduct"
import UpdateAddress from "../pages/account-settings/addresses/UpdateAddress"
import { ProductsV2 } from "../pages/products/ProductsV2"
import ViewShopProduct from "../pages/shop/ViewShopProduct"
import { UserCart } from "../pages/shop/UserCart"
import ShopProfile from "../pages/account-settings/shop-profile/ShopProfile"
import ShopCheckout from "../pages/shop/ShopCheckout"
import OrderPlaced from "../pages/shop/OrderPlaced"
import OrderDetail from "../pages/shop/OrderDetail"
import UserStore from "../pages/user-store/UserStore"
import SocketContextProvider from "../contexts/SocketContext"
import Chat from "../pages/chat/Chat"
import { ChatBox } from "../pages/chat/ChatBox"
import { LikedProducts } from "../pages/liked-products/LikedProducts"
import UserNotifications from "../pages/user-store/UserNotifications"
import Transaction from "../pages/transaction/Transaction"
// import { ProductPageLayout } from "../layouts/product/ProductPageLayout"

export const PrivateRoutes = () => {
    return (
        <UserContextProvider>
            <Route path="/dashboard">
                <DashboardLayout />
            </Route>


            {/* <Route path="/products">
                <ProductsV2 />
            </Route> */}
            <Route path="/products/new">
                <AddNewProduct />
            </Route>
            <Route exact path="/products/:id/update">
                <UpdateProduct />
            </Route>
            <Route path="/products/:id/view">
                <ViewProduct />
            </Route>
            

            

            <Route path="/account-settings">
                <AccountSetting />
            </Route>
            <Route path="/account-settings/profile">
                <AccountProfile />
            </Route>
            <Route path="/account-settings/shop-profile">
                <ShopProfile />
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
            <Route path="/account-settings/addresses/add-new/:as?">
                <AddNewAddress />
            </Route>
            <Route path="/account-settings/addresses/edit-address">
                <UpdateAddress />
            </Route>

            <Route exact path="/shop">
                <Shop />
            </Route>
            <Route exact path="/shop/search">
                <ShopSearch />
            </Route>
            <Route path="/shop/product/:id/view">
                <ViewShopProduct />
            </Route>
            <Route path="/shop/search/:search_string">
                <Shop />
            </Route>
            <Route exact path="/shop/cart">
                <UserCart />
            </Route>
            <Route exact path="/shop/cart/checkout">
                <ShopCheckout />
            </Route>
            <Route exact path="/shop/cart/checkout/order-placed">
                <OrderPlaced />
            </Route>
            <Route exact path="/shop/order/:order_id/order-detail">
                <OrderDetail />
            </Route>

            <Route path="/shop/liked-products">
                <LikedProducts />
            </Route>

            
            <Route path="/user-store">
                <UserStore />
            </Route>

            <SocketContextProvider>
                <Route exact path="/chat">
                    <Chat />
                </Route>
                <Route exact path="/chat/:chatroom/messages">
                    <ChatBox />
                </Route>
            </SocketContextProvider>

            <Route exact path="/notifications">
                <UserNotifications />
            </Route>

            <Route exact path="/transactions">
                <Transaction />
            </Route>




        </UserContextProvider>
    )
}