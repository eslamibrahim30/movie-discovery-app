import toast from "react-hot-toast";

export const notify = {
    success: (message) =>
        toast.success(message, {
            duration: 3000,
        }),

    error: (message) =>
        toast.error(message, {
            duration: 3000,
        }),

    loading: (message) =>
        toast.loading(message),
};