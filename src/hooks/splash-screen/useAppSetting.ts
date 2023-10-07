import { useQuery } from "@tanstack/react-query"
import { getAllAppSettingsFromAPI } from "../../requests/app-setting.request"

export const useAppSetting = () => {
    const AppSettingsQuery = useQuery(["app-settings"], () => getAllAppSettingsFromAPI())

    return { AppSettingsQuery }
}