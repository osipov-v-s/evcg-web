import { StoredFile } from "../../types/files/file";
import { formatFileSize } from "./formatFileSize";

interface FileMetaProps {
    file: StoredFile
    showContentType?: boolean
}

export const FileMeta = ({file, showContentType = true}: FileMetaProps) => (
    <div className="file-meta">
        <span 
            className="file-meta__name" title={file.originalName}>
                {file.originalName}
        </span>
        <span className="file-meta__size">{formatFileSize(file.sizeBytes)}</span>
        {showContentType && (
            <span className="file-meta__type" title={file.contentType}>
                {file.contentType}
            </span>
        )}
        
    </div>
)