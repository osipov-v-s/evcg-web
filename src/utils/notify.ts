import toast from "react-hot-toast"

export const notifyError = (message: string) => toast.error(message, { id: "auth-error" })
export const notifySuccess = (message: string) => toast.success(message, { id: "auth-success" })
