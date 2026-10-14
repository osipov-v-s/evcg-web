import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { StoredFile } from "../../types/files/file";
import toast from "react-hot-toast";
import { storedFileApi } from "../../services/api/storedFileApi";
import { Button } from "../ui/reusable/button";
import { Download } from "lucide-react";

interface FileDownloadButtonProps {
    file: StoredFile
    label?: string
    variant?: "primary" | "secondary" | "tertiary" | "ghost",
    disabled?: boolean
}
export const FileDownloadButton = ({
    file,
    label = "Скачать",
    variant = "secondary",
    disabled = false
}: FileDownloadButtonProps) => {
    const { getToken } = useAuth()
    const [isDownloading, setIsDownloading] = useState(false)
    const handleDownload = async () => {
        if (isDownloading) return
        try {
            setIsDownloading(true)
            await storedFileApi.downloadFile(file, getToken())
        } catch (err) {
            console.error(err)
            toast.error("Не удалось скачать файл")
        } finally {
            setIsDownloading(false)
        }
    }
    return (
        <Button
            label={isDownloading ? "Скачиваем…" : label}
            icon={<Download />}
            variant={variant}
            onClick={handleDownload}
            disabled={disabled || isDownloading}
        />
    )
}