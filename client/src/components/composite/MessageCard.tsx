import { useColourProvider } from "@/contexts/ColourContext";
import { formatRelativeTime } from "@/utils/dateTimeUtils";
import { useEffect, useState } from "react";

interface IMessageCard {
    user: string;
    message: string;
    added: Date;
}

export const MessageCard = ({ user, message, added }: IMessageCard) => {
    const { getNextColour } = useColourProvider();
    const [colour, setColour] = useState("");

    useEffect(() => {
        setColour(getNextColour());
    }, [getNextColour]);

    return (
        <div className="w-full p-4 rounded-lg backdrop-blur-sm animate-slide-up">
            <div className="flex items-start gap-3">
                <div
                    className="w-10 h-10 rounded-full flex-shrink-0"
                    style={{ backgroundColor: colour }}
                />
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
