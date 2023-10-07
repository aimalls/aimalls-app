import { PublicRoutes } from "./PublicRoutes"
import { PrivateRoutes } from "./PrivateRoutes"

export const Routes: React.FC = () => {
    return (
        <>
            <PublicRoutes />
            <PrivateRoutes />
        </>
    )
}