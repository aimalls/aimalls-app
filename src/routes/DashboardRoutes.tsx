import { FC } from "react";
import { Route } from "react-router";
import DashboardV2 from "../pages/dashboard/Dashboard";
import { Products } from "../pages/products/Products";
import Shop from "../pages/shop/Shop";

export interface iProps { }
export const DashboardRoutes: FC<iProps> = (props): JSX.Element => {
    return (
        <>
      
            
            <Route exact path="/dashboard">
                <DashboardV2 />
            </Route>
            <Route exact path="/products">
                <Products />
            </Route>
        </>
    )
};
export default DashboardRoutes;