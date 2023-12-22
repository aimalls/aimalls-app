import { IonMenu, IonList, IonAvatar, IonItem, IonIcon, IonLabel } from "@ionic/react"
import { homeOutline, personCircleOutline, bagHandleOutline, heartOutline, receiptOutline, peopleOutline, logOutOutline, cog, cube, cart, cartOutline, cubeOutline, peopleCircleOutline } from "ionicons/icons"
import { useHistory } from "react-router";
import { processLogoutToAPI } from "../../requests/auth.request";

import "../../styles/v1/pages/shop/Sidebar.scss"
import { useUser } from "../../hooks/auth/useUser";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useAccountProfile } from "../../hooks/account-profile/useAccountProfile";

export const Sidebar: React.FC = () => {
    const navigation = useHistory();

    const { userQuery } = useUser();
    const { data: user, isLoading: userIsLoading } = userQuery

    const accountProfile = useAccountProfile();
    const { name, gender, dob, phone } = useSelector((state: RootState) => state.accountProfileStore)



    const processLogout = async () => {
        try {
            const logoutRequest = await processLogoutToAPI()
            localStorage.removeItem("authToken")
            navigation.push("/login")

        } catch (err) {
            console.log(err)
        }
    }

    const navigations = [
        {
            link: "/dashboard",
            icon: homeOutline,
            text: "Dashboard"
        },
        {
            link: "/shop",
            icon: cartOutline,
            text: "Shop"
        },
        {
            link: "/products",
            icon: cubeOutline,
            text: "My Products"
        },
        {
            link: "/account-settings",
            icon: personCircleOutline,
            text: "Account Settings"
        },
        {
            link: "/settings",
            icon: cog,
            text: "Settings"
        },
    ]

    return (
        <IonMenu contentId="shop-content">
            <IonList  style={{ background: 'none' }} lines='none' id="list-menu">
                <IonAvatar>
                    
                    {/* <img src={avatar} alt="avatar" height={80} width={80} style={{borderRadius: "15px"}} /> */}
                </IonAvatar>
                <div style={{paddingBottom: "50px"}} className="greetings">
                    <div style={{ fontSize: "15px", padding: "10px 0", }}>Hello, { name.first_name }</div>
                </div>

                { navigations.map((nav, index) => (
                    <IonItem key={`nav-${index}`} lines="none" routerLink={nav.link} className={ navigation.location.pathname == nav.link ? "active" : ""}>
                        <IonIcon color={'primary'} icon={nav.icon} slot="start"></IonIcon>
                        <IonLabel className='navigation-link'>{ nav.text }</IonLabel>
                    </IonItem>
                )) }

                <div  style={{ borderTop: "1px solid #f3f3f3", margin: "20px 20px 40px 20px" }}></div>
                <IonItem lines='none' onClick={() => processLogout()}>
                    <IonIcon color={'primary'} icon={logOutOutline} slot="start"></IonIcon>
                    <IonLabel slot='start' className='navigation-link'>
                        Log out
                    </IonLabel>
                </IonItem>
            </IonList>
        </IonMenu>
    )
}