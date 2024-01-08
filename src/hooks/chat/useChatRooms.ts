import { useQuery } from "@tanstack/react-query";
import { getUserChatRoomsFromAPI } from "../../requests/chat-room.request";

export const useChatRooms = () => {
    const { data: ChatRooms, isLoading: isChatRoomsLoading, refetch: refetchChatRooms } = useQuery(["chat-rooms-query"], () => getUserChatRoomsFromAPI())

    return {
        ChatRooms,
        isChatRoomsLoading,
        refetchChatRooms
    }
}
