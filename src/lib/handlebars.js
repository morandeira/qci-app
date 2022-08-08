import { format } from "timeago.js";

// export const timeago = (savedTimestamp) => format(savedTimestamp);

export const timeago = (savedTimestamp) => {
    if (savedTimestamp === null) {
        return "";
    } else {
        return format(savedTimestamp);
    }
};