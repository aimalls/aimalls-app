import { useQuery } from "@tanstack/react-query";
import { getUserNotificationsFromAPI } from "../../requests/notification.request";

export const useUserNotifications = () => {
    const { data: userNotifications, isLoading: isUserNotificationsLoading, refetch } = useQuery(["user-notifications-query"], () => getUserNotificationsFromAPI());

    return {
        userNotifications,
        isUserNotificationsLoading,
        refetch
    }
}

export default useUserNotifications;