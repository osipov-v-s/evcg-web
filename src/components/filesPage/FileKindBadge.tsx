import { FileKind } from "../../types/files/file";
import { FILE_KIND_META } from "./fileKindMeta";
import "./css/files.css"
interface FileKindBadgeProps {
    kind?: FileKind
    size?: "sm" | "md"
}
export const FileKindBadge = ({kind, size = "sm"}: FileKindBadgeProps) => {
    if (!kind) return null
    const {label, description, icon: Icon} = FILE_KIND_META[kind]

    return (
        <span
            className={`file-kind-badge file-kind-badge--${size}`}
            data-kind={kind}
            title={description}>
                <Icon size={size === "sm" ? 12 : 14} aria-hidden="true" />
                {label}
        </span>
    )
}