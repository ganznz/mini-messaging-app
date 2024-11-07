export const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // Less than a minute
    if (diffInSeconds < 60) {
        return "message was sent a few sec ago";
    }

    // Less than an hour
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `message sent ${diffInMinutes} minute${
            diffInMinutes !== 1 ? "s" : ""
        } ago`;
    }

    // Less than 24 hours
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `message sent ${diffInHours} hour${
            diffInHours !== 1 ? "s" : ""
        } ago`;
    }

    // More than 24 hours - format as date and time
    const ampm = date.getHours() >= 12 ? "pm" : "am";
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `message sent ${day}/${month}/${year} ${hours}:${minutes}${ampm}`;
};
