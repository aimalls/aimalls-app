import { useQuery } from "@tanstack/react-query";
import { getChatMessagesFromAPI } from "../../requests/chat.request";

export const useChatMessages = (chatroom?: string) => {
    const { data: ChatMessages, isLoading: isChatMessagesLoading, refetch: refetchChatMessages } = useQuery(["chat-messages-query"], () => getChatMessagesFromAPI(chatroom!), { enabled: !!chatroom })

    return {
        ChatMessages,
        isChatMessagesLoading,
        refetchChatMessages
    }
}
