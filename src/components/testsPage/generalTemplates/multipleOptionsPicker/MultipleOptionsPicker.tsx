import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Button } from "../../../ui/reusable/button"
import { ProgressBar } from "../progressBar/ProgressBar"
import { ArrowLeft, ArrowRight, CheckCheck } from "lucide-react"

export interface MultipleOption {
    id: number
    text: string
    correct?: boolean // Флаг правильности ответа (для подсчета результатов)
    isChecked?: boolean // Флаг выбора пользователем в UI
}

export interface MultipleTask {
    id: number
    taskNumber?: number
    text?: string | null
    options: MultipleOption[]
    imageUrl?: string
    userAnswer?: number | number[]
    userAnswers?: number[]
}

interface MultipleOptionPickerProps {
    tasks: MultipleTask[]
    setTasks: (tasks: MultipleTask[]) => void
    navigateToResults: () => void
    description?: string
    timerString?: string
    hideSkipButton?: boolean
    checkRequired?: number
}

export const MultipleOptionsPicker = ({
    tasks,
    setTasks,
    navigateToResults,
    description,
    timerString,
    hideSkipButton = false,
    checkRequired = 2
}: MultipleOptionPickerProps) => {
    const [currentTaskNumber, setCurrentTaskNumber] = useState<number>(0)

    const currentTask = tasks[currentTaskNumber]

    // Считаем выбранные варианты
    const selectedOptions = currentTask?.options.filter(op => op.isChecked) || []
    const selectedCount = selectedOptions.length
    const isAnswerValid = selectedCount === checkRequired

    const handleOptionToggle = (optionId: number) => {
        if (!currentTask) return

        const targetOption = currentTask.options.find(op => op.id === optionId)
        if (!targetOption) return

        // Блокируем выбор нового варианта, если уже выбран максимум
        if (!targetOption.isChecked && selectedCount >= checkRequired) {
            toast.error(`Вы можете выбрать не более ${checkRequired} вариантов`)
            return
        }

        // Обновляем состояние isChecked для опций
        const updatedOptions = currentTask.options.map(op =>
            op.id === optionId ? { ...op, isChecked: !op.isChecked } : op
        )

        const selectedIds = updatedOptions.filter(op => op.isChecked).map(op => op.id)

        const updatedTask: MultipleTask = {
            ...currentTask,
            options: updatedOptions,
            userAnswers: selectedIds,
            userAnswer: selectedIds
        }

        const updatedTasks = tasks.map((task, idx) =>
            idx === currentTaskNumber ? updatedTask : task
        )

        setTasks(updatedTasks)
    }

    const changeTask = (step: number) => {
        const newNumber = currentTaskNumber + step

        if (newNumber < 0 || newNumber >= tasks.length) {
            toast("Дальше некуда идти")
            return
        }

        setCurrentTaskNumber(newNumber)
    }

    if (!currentTask) return null

    return (
        <div className="test-wrapper">
            <div className="test-card-info">
                <div className="test-card-count">
                    <div className="test-card-questions">
                        Вопрос {currentTaskNumber + 1} из {tasks.length}
                    </div>

                    {timerString && (
                        <div className="test-card-timer">
                            {timerString}
                        </div>
                    )}
                </div>

                <div className="test-card-description">
                    <span>Как отвечать: </span>
                    {description || `Выберите ${checkRequired} правильных варианта ответа.`}
                </div>
            </div>

            <div className="test-card multiple-options-picker">
                {currentTask.text && (
                    <div className="test-card-text">
                        {currentTask.text}
                    </div>
                )}

                <div className="test-card-image-text-wrapper">
                    {currentTask.imageUrl && (
                        <div className="test-card-img">
                            <img src={currentTask.imageUrl} alt="" />
                        </div>
                    )}

                    <div className="test-card-list column">
                        {currentTask.options.map(option => (
                            <div
                                key={option.id}
                                onClick={() => handleOptionToggle(option.id)}
                                className={`test-card-selectable checkbox ${option.isChecked ? "active" : ""}`}
                            >
                                <input
                                    type="checkbox"
                                    checked={!!option.isChecked}
                                    readOnly
                                    className="mr-2 pointer-events-none"
                                />
                                <span>{option.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="test-card-options">
                    <Button
                        label="Назад"
                        variant="secondary"
                        icon={<ArrowLeft />}
                        disabled={currentTaskNumber === 0}
                        onClick={() => changeTask(-1)}
                    />

                    {currentTaskNumber < tasks.length - 1 ? (
                        !hideSkipButton && (
                            <Button
                                label="Далее"
                                icon={<ArrowRight />}
                                disabled={!isAnswerValid}
                                onClick={() => changeTask(1)}
                            />
                        )
                    ) : (
                        <Button
                            label="Завершить"
                            icon={<CheckCheck />}
                            disabled={!isAnswerValid}
                            onClick={navigateToResults}
                        />
                    )}
                </div>

                <ProgressBar currentTaskNumber={currentTaskNumber} total={tasks.length} />
                <Toaster />
            </div>
        </div>
    )
}