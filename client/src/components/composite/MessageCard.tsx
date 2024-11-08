import { formatRelativeTime } from "@/utils/dateTimeUtils";

interface IMessageCard {
    user: string;
    message: string;
    added: Date;
    pfpColour?: string;
}

export const MessageCard = ({
    user,
    message,
    added,
}: // pfpColour = "black",
IMessageCard) => {
    return (
        <div className="w-full p-4 rounded-lg backdrop-blur-sm animate-slide-up">
            <div className="flex items-start gap-3">
                {/* Profile Picture Circle */}
                <div className="w-10 h-10 rounded-full flex-shrink-0 bg-black" />

                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <span className="font-semibold text-sm">{user}</span>
                        <span className="text-xs text-gray-500 italic">
                            {formatRelativeTime(added)}
                        </span>
                    </div>

                    {/* Message Text */}
                    <p className="mt-2 text-sm">{message}</p>
                </div>
            </div>
        </div>
    );
};
