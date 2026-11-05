import "./css/testsLayout.css"

import { FC, useCallback, useEffect, useState } from "react"
import { TestItem, testsList } from "./TestsData"
import { TestCard } from "./TestCard"
import { useNavigate, useSearchParams } from "react-router-dom"
import { testApi } from "../../services/api/testApi"
import { useAuth } from "../../contexts/AuthContext"
import { TestResultResponse } from "../../types/testTypes"
import toast from "react-hot-toast"
import { VrTestsPage } from "./VRTests/VrTestsPage"
import { Button } from "../ui/reusable/button"

export const TestsPage: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams()

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
        <>
            <div className="tests-type-switch">
                <Button label="Основные тесты" onClick={() => setSearchParams({ view: "common" })} />
                <Button label="VR тесты" onClick={() => setSearchParams({ view: "vr" })} />
            </div>
            
            <section className="tests">
                <div className="tests-grid">
                    {searchParams.get("view") === "vr" ?
                        (<VrTestsPage />) :

                        (<>
                            {testsList.map((item, index) => (
                                <TestCard
                                    dataId={item.id}
                                    index={index}
                                    isAvailable={item.isAvailable}
                                    item={item}
                                    onClick={handleClick}
                                    resultOnClick={showResultClick}
                                    isComplete={recentTests ? recentTests[item.name] != null : false} />))}
                        </>)}
                </div>


            </section>
        </>
    )
}