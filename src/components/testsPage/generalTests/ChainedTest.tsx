import React, { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate, useLocation, useSearchParams } from "react-router-dom"
import { useTimer } from "../hooks/useTimer"
import { formatTime } from "../utils/formatTime"
import { NoResults } from "../../ui/noResultComponent/NoResult"

// Интерфейсы и Типы
export interface BaseTestComponentProps<T = any> {
    tasks: T[]
    setTasks: React.Dispatch<React.SetStateAction<T[] | undefined>>
    navigateToResults: () => void
    description?: string
    pickerStyleType?: "squeezed" | "extended"
    optionStyleType?: "column" | "row"
    hideSkipButton?: boolean
    timerString?: string
}

export interface TestStepConfig<T = any> {
    id: string
    /* Маршрут интро-экрана перед запуском этого шага */
    secondIntroPath?: string
    fetchData: () => Promise<T[]>
    Component: React.ComponentType<BaseTestComponentProps<T> & any>
    componentProps?: Record<string, any>
    description?: string
    hasTimer?: boolean
    initialSeconds?: number
    autoStartTimer?: boolean
    autoNavigationOnTimeout?: boolean
    pickerStyle?: "squeezed" | "extended"
    optionStyle?: "column" | "row"
    hideSkipButton?: boolean
}

export interface ChainedTestConfig {
    steps: TestStepConfig[]
    resultPath: string
}

export interface ChainedResultStep<T = any> {
    tasks: T[]
    completionTimeSeconds: number
}

export type ChainedResultsState = Record<string, ChainedResultStep>

// Исполнитель шага (TestStepRunner)
interface TestStepRunnerProps {
    config: TestStepConfig
    onStepComplete: (stepId: string, tasks: any[], completionTime: number) => void
}

const TestStepRunner: React.FC<TestStepRunnerProps> = ({ config, onStepComplete }) => {
    const [tasks, setTasks] = useState<any[]>()
    const [error, setError] = useState<string | null>(null)
    const isCountdown = Boolean(config.initialSeconds)
    const timer = useTimer(config.initialSeconds || 0, isCountdown)
    const isTimerStarted = useRef(false)

    const handleComplete = useCallback(() => {
        const completionTime = config.initialSeconds
            ? config.initialSeconds - timer.seconds
            : timer.seconds

        onStepComplete(config.id, tasks || [], completionTime)
    }, [config.id, config.initialSeconds, onStepComplete, tasks, timer.seconds])

        useEffect(() => {
        let isMounted = true
        setError(null)
        setTasks(undefined)
        config.fetchData()
            .then((data) => {
                if (isMounted) setTasks(data)
            })
            .catch((err) => {
                if (isMounted) setError(err?.message ?? "LOAD_ERROR")
            })
        return () => {
            isMounted = false
        }
    }, [config])

    useEffect(() => {
        if (tasks && config.autoStartTimer !== false && !isTimerStarted.current) {
            timer.start()
            isTimerStarted.current = true
        }
    }, [tasks, config.autoStartTimer, timer])

    useEffect(() => {
        if (
            config.autoNavigationOnTimeout &&
            timer.seconds === 0 &&
            tasks &&
            isTimerStarted.current &&
            isCountdown
        ) {
            handleComplete()
        }
    }, [timer.seconds, tasks, handleComplete, config.autoNavigationOnTimeout, isCountdown])
    if (error === "VR_TEST_NOT_FOUND") {
        return (
            <NoResults
                variant="empty"
                title="Тест ещё не готов"
                message="Для этой профессии пока нет заданий. Попробуйте позже."
            />
        )
    }
    if (error) 
        return <NoResults variant="error" message="Не удалось загрузить задания." />

    if (!tasks) return <p>Загрузка заданий...</p>

    const timerString = `${formatTime(timer.minutes)} : ${formatTime(timer.remaningSeconds)}`

    return (
        <config.Component
            {...config.componentProps}
            tasks={tasks}
            setTasks={setTasks}
            navigateToResults={handleComplete}
            description={config.description}
            pickerStyleType={config.pickerStyle}
            optionStyleType={config.optionStyle}
            hideSkipButton={config.hideSkipButton}
            timerString={config.hasTimer !== false ? timerString : undefined}
        />
    )
}

// Конструктор цепочки с поддержкой роутинга
export const ChainedTest = (config: ChainedTestConfig) => {
    return () => {
        const navigate = useNavigate()
        const location = useLocation()
        const [searchParams] = useSearchParams()

        // Извлекаем текущий индекс из URL query-параметра ?step=X (по умолчанию 0)
        const currentStepIndex = parseInt(searchParams.get("step") || "0", 10)

        // Восстанавливаем ранее сохраненные результаты из state роутера
        const accumulatedResults: ChainedResultsState = location.state?.chainedResults || {}
        const resultsRef = useRef<ChainedResultsState>(accumulatedResults)

        useEffect(() => {
            resultsRef.current = accumulatedResults
        }, [accumulatedResults])

        const currentStep = config.steps[currentStepIndex]

        const handleStepComplete = useCallback(
            (stepId: string, tasks: any[], completionTimeSeconds: number) => {
                const nextResults = {
                    ...resultsRef.current,
                    [stepId]: { tasks, completionTimeSeconds },
                }

                const nextStepIndex = currentStepIndex + 1

                if (nextStepIndex < config.steps.length) {
                    const nextStep = config.steps[nextStepIndex]

                    if (nextStep.secondIntroPath) {
                        // Если у следующего теста есть интро — переходим на его URL и передаем накопившиеся результаты
                        navigate(nextStep.secondIntroPath, {
                            state: {
                                chainedResults: nextResults,
                                nextStepIndex: nextStepIndex,
                            },
                        })
                    } else {
                        // Если интро нет — просто обновляем URL параметр ?step=N
                        navigate(`?step=${nextStepIndex}`, {
                            state: { chainedResults: nextResults },
                        })
                    }
                } else {
                    // Итоговая навигация после всех тестов
                    navigate(config.resultPath, {
                        state: { chainedResults: nextResults },
                    })
                }
            },
            [currentStepIndex, navigate]
        )

        if (!currentStep) return null

        return (
            <TestStepRunner
                key={`${currentStep.id}-${currentStepIndex}`}
                config={currentStep}
                onStepComplete={handleStepComplete}
            />
        )
    }
}