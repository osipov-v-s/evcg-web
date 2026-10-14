import { formatDateRU } from "../../services/dates/formatDate";
import { StoredFile } from "../../types/files/file";
import "../adminPages/css/card.css"
import { FileDownloadButton } from "./FileDownloadButton";
import { FileKindBadge } from "./FileKindBadge";
import { formatFileSize } from "./formatFileSize";
interface FileCardProps {
    file: StoredFile
}

export const FileCard = ({file}: FileCardProps) => (
    <div className="base-card">
        <div className="card-title file-card-title">
            <span className="file-card-title__name" title={file.originalName}>
                {file.originalName}
            </span>
            <FileKindBadge kind={file.kind} />
        </div>

        <div className="info-row">
            <span className="info-label">ID:</span>
            <span>{file.id}</span>
        </div>

        <div className="info-row">
            <span className="info-label">Размер:</span>
            <span>{formatFileSize(file.sizeBytes)}</span>
        </div>

        <div className="info-row">
            <span className="info-label">Тип:</span>
            <span>{file.contentType || "—"}</span>
        </div>

        {file.ownerAccountId != null && (
            <div className="info-row">
                <span className="info-label">Владелец:</span>
                <span>{file.ownerAccountId}</span>
            </div>
        )}

        {file.createdAt && (
            <div className="info-row">
                <span className="info-label">Загружен:</span>
                <span>{formatDateRU(file.createdAt)}</span>
            </div>
        )}

        <div className="card-actions">
            <FileDownloadButton file={file} />
        </div>
    </div>
)