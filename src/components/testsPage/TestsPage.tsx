import "./css/layoutGrid.css"

import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { TestItem, testsList } from "./TestsData"
import { TestCard } from "./TestCard"
import { useNavigate } from "react-router-dom"
import { testApi } from "../../services/api/testApi"
import { useAuth } from "../../contexts/AuthContext"
import { TestResultResponse } from "../../types/testTypes"
import toast from "react-hot-toast"

export const TestsPage: FC = () => {
    const navigate = useNavigate()
    const { getToken } = useAuth()

    const [recentTests, setRecentTests] = useState<Record<string, TestResultResponse>>({})
    const [isVr, setIsVr] = useState<boolean>(false)

    useEffect(() => {
        const loadRecentTests = async () => {
            try {
                const tests = await testApi.getRecentTests(getToken())
                setRecentTests(tests || {})
            } catch (error) {
                console.error("Failed to load recent tests:", error)
                toast.error("Не удалось загрузить прогресс тестирования")
            }
        }

        loadRecentTests()
    }, [getToken])

    const filteredTests = useMemo(() => {
        return testsList.filter((test) => Boolean(test.isVr) === isVr)
    }, [isVr])

    const handleClick = useCallback((path: string) => {
        navigate(path)
    }, [navigate])

    const showResultClick = async (testItem: TestItem) => {
        if (!testItem.pathResults) {
            toast.error("Результаты не найдены для теста, попробуйте позже")
            return
        }

        try {
            navigate(testItem.pathResults, {
                state: {
                    isViewMode: true,
                    psychTest: recentTests[testItem.name]
                }
            })

        } catch (err) {
            console.error(err)
            toast.error("Ошибка при загрузке результатов")
        }
    }

    return (
        <div className="test-container">
            {/* Переключатель типов тестов */}
            <div className="test-tabs">
                <button
                    className={`tab-btn ${!isVr ? "active" : ""}`}
                    onClick={() => setIsVr(false)}
                >
                    Обычные тесты
                </button>
                <button
                    className={`tab-btn ${isVr ? "active" : ""}`}
                    onClick={() => setIsVr(true)}
                >
                    VR тесты
                </button>
            </div>

            {/* Сетка карточек */}
            <div className="test-grid">
                {filteredTests.map((item, index) => (
                    <div key={item.id} className="test-grid-item show">
                        <TestCard
                            dataId={item.id}
                            index={index}
                            isAvailable={item.isAvailable}
                            item={item}
                            onClick={handleClick}
                            resultOnClick={showResultClick}
                            isComplete={recentTests ? recentTests[item.name] != null : false}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}