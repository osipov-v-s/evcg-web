import { FC } from "react"
import { Toaster } from "react-hot-toast"

/**
 * Единственный Toaster приложения. Рендерится один раз в MainLayout,
 * на страницах отдельный <Toaster /> больше не нужен: достаточно вызвать toast(...).
 */
export const AppToaster: FC = () => (
    <Toaster
        position="top-center"
        gutter={8}
        toastOptions={{
            duration: 4000,
            error: { duration: 6000 },
        }}
    />
)
