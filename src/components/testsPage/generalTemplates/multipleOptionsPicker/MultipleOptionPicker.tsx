//TODO Подумать над типами данных ? которые принимает шаблон 
// Другие принимаемые параметры для теста время, 

import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Button } from "../../../ui/reusable/button"
import { ArrowLeft, ArrowRight, CheckCheck } from "lucide-react"

// функция для завершение теста и передачи результатов и прочее (смотри пример SingleOptionsPicker)
export interface MultipleTask {
    id: number
    taskNumber: number
    text?: string | null
    options: MultipleOption[]
    imageUrl?: string
}
export interface MultipleOption {
    id: number
    text: string
    isChecked: boolean
}
interface MultipleOptionPickerProps {
    tasks: MultipleTask[]
    setTasks: (tasks: MultipleOption[]) => void
    navigateToResults: () => void
    description?: string
    timerString?: string
    hideSkipButton?: boolean
    checkRequired?: number
}
export const MultipleOptionPicker = ({
        tasks, setTasks, navigateToResults, description, timerString, hideSkipButton, checkRequired = 2}: MultipleOptionPickerProps) => {
    const [currentTask, setCurrentTask] = useState<MultipleTask>()
    const [currentTaskNumber, setCurrentTaskNumber] = useState<number>(0) 
    const [currentChecks, setCurrentChecks] = useState<number>(0)
    useEffect(() => {
        if (!tasks || tasks.length === 0) return

        setCurrentTask(tasks[currentTaskNumber])
    }, [currentTaskNumber, tasks])
    const checkOption = (tasks: MultipleTask, option: MultipleOption) => {
        if (currentChecks === checkRequired ) {
            //TODO заблокировать кнопку продолжить при currentChecks > checkRequired ||  currentChecks < checkRequired
            toast.error(`Максимум можно ответить ${checkRequired}`)
            return
        }
        //TODO найти options нужную и поставить isChecked true
        //setTasks(prev => prev.map(task =>))
        setCurrentChecks(prev => prev + 1)
    }
    const changeTask = (step: number) => {
        const newNumber = currentTaskNumber + step
        if (newNumber < 0 || newNumber >= tasks.length) {
            toast("Дальше некуда идти")
            return
        }
        setCurrentTaskNumber(newNumber)
    }
    
    return <>
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

                {description && (
                    <div className="test-card-description">
                        <span>Как отвечать: </span>{description}
                    </div>
                )}
            </div>
            <div>

                {currentTask?.text &&
                    <div className="test-card-text">
                        {currentTask?.text}
                    </div>
                }
                {currentTask?.imageUrl &&
                    <div className="test-card-img">
                        <img src={currentTask?.imageUrl} alt="" />
                    </div>
                }
                {currentTask?.options.map(option => (
                    <div onClick={() => checkOption(currentTask, option)} className={`test-card-selectable ${option.isChecked ? "active" : ""}`}>
                        {option?.text}
                    </div>
                ))}
            </div>

            
                <div className="test-card-options">
                    <Button label="Назад" variant="secondary" icon={<ArrowLeft />} disabled={currentTaskNumber === 0} onClick={() => { changeTask(-1) }} />

                    {currentTaskNumber < tasks.length - 1 ? (
                        !hideSkipButton && (
                            <Button label="Далее" icon={<ArrowRight />} onClick={() => changeTask(1)} />
                        )
                    ) : (
                        <Button label={"Завершить"} icon={<CheckCheck />} onClick={navigateToResults} />
                    )}

                </div>

        </div>
    </>
}