import { FormEvent, useState } from "react";
import { FileKind, StoredFileFilters } from "../../types/files/file";
import { FILE_KIND_META, FILE_KIND_ORDER } from "./fileKindMeta";
import { DataFilterBar } from "../ui/common/DataFilterBar";

interface FilesFilterBarProps {
    filters: StoredFileFilters
    onApply: (filters: StoredFileFilters) => void
}
const emptyFilters: StoredFileFilters = {}

export const FilesFilterBar = ({filters, onApply}: FilesFilterBarProps) => {
    const [draft, setDraft] = useState<StoredFileFilters>(filters)

    const submit = (event: FormEvent) => {
        event.preventDefault()
        onApply(draft)
    }
    const reset = () => {
        setDraft(emptyFilters)
        onApply(emptyFilters)
    }
        return (
        <form onSubmit={submit}>
            <DataFilterBar onReset={reset}>
                <select
                    aria-label="Тип файла"
                    value={draft.kind || ""}
                    onChange={e =>
                        setDraft({
                            ...draft,
                            kind: (e.target.value || undefined) as FileKind | undefined,
                        })
                    }
                >
                    <option value="">Все типы</option>
                    {FILE_KIND_ORDER.map(kind => (
                        <option key={kind} value={kind}>
                            {FILE_KIND_META[kind].label}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    min={1}
                    aria-label="Логин"
                    placeholder="Логин"
                    value={draft.accountEmail ?? ""}
                    onChange={e =>
                        setDraft({
                            ...draft,
                            accountEmail: e.target.value
                                ? String(e.target.value)
                                : undefined,
                        })
                    }
                />

                <input
                    type="date"
                    aria-label="С даты"
                    placeholder="С даты"
                    value={draft.from || ""}
                    onChange={e =>
                        setDraft({ ...draft, from: e.target.value || undefined })
                    }
                />

                <input
                    type="date"
                    aria-label="По дату"
                    placeholder="По дату"
                    value={draft.to || ""}
                    onChange={e =>
                        setDraft({ ...draft, to: e.target.value || undefined })
                    }
                />

                <button className="primary-action" type="submit">
                    Применить
                </button>
            </DataFilterBar>
        </form>
    )
}