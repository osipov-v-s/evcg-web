import { FileText, FlaskConical, ImageIcon, Layers, LucideIcon } from "lucide-react"
import { FileKind } from "../../types/files/file"
import "./css/files.css"
export interface FileKindMeta {
    label: string
    description: string
    icon: LucideIcon
    isPublic: boolean
}
export const FILE_KIND_META: Record<FileKind, FileKindMeta> = {
    SIMULATION: {
        label: "Симуляция",
        description: "Приватный файл, принадлежит ученику",
        icon: FlaskConical,
        isPublic: false,
    },
    COMPARISON_SESSION: {
        label: "Сессии сравнения",
        description: "Приватный файл, принадлежит ученику или специалисту",
        icon: Layers,
        isPublic: false,
    },
    COMPARISON_SAMPLE_IMAGE: {
        label: "Изображения коллекций",
        description: "Публичное изображение, загружается только администратором",
        icon: ImageIcon,
        isPublic: true,
    },
    VR_TEST_ASSET: {
        label: "VR-ассет",
        description: "Публичный ресурс для VR-тестов (зарезервирован)",
        icon: FileText,
        isPublic: true,
    },
}
/** Stable display order for filter dropdowns and lists. */
export const FILE_KIND_ORDER: FileKind[] = [
    "SIMULATION",
    "COMPARISON_SESSION",
    "COMPARISON_SAMPLE_IMAGE",
    "VR_TEST_ASSET",
]

export const getFileKindMeta = (kind: FileKind | undefined): FileKindMeta | undefined => 
    kind ? FILE_KIND_META[kind] : undefined