import { FC, memo } from "react"
import { TestItem } from "./TestsData"
import { Timer, FileQuestion, ArrowRight, CheckCheck, Check } from "lucide-react"
import { Button } from "../ui/reusable/button"

interface TestItemProps {
    item: TestItem
    dataId: string
    index: number
    isAvailable?: boolean
    isComplete?: boolean
    onClick: (path: string) => void
    resultOnClick: (item: TestItem) => void
}

const getDeclension = (count: number, titles: [string, string, string]) => {
    const cases = [2, 0, 1, 1, 1, 2]
    return titles[
        count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
    ]
}

export const TestCard: FC<TestItemProps> = memo(({
    item,
    dataId,
    index,
    isAvailable,
    isComplete,
    onClick,
    resultOnClick,
}) => {
    const handleClick = () => {
        if (!isAvailable) return
        if (item.path) onClick(item.path)
    }

    return (
        <div className={`test-grid-item ${!isAvailable ? "locked" : ""} ${isComplete ? "complete" : ""}`} onClick={handleClick} data-test-id={dataId}>
            <div className="test-item-bg" />

            <div className="test-item-content">
                <div className="test-item-header">
                    <h2 className="test-item-title">{item.label}</h2>
                    <span className="test-item-author">{item.author}</span>
                </div>

                <div className="test-item-info">
                    <div className="test-item-hint">
                        <Timer />
                        <span>{item.time} {getDeclension(item.time, ["минута", "минуты", "минут"])}</span>
                    </div>

                    <div className="test-item-hint">
                        <FileQuestion />
                        <span>{item.questionscount} {getDeclension(item.questionscount, ["вопрос", "вопроса", "вопросов"])}</span>
                    </div>
                </div>


                {isComplete ?
                    <div className="test-item-complition test-complete">
                        <Check />
                    </div> :
                    <div className="test-item-complition test-not">
                        <ArrowRight />
                    </div>}


                {isComplete && (
                    <div className="test-item-options">
                        <Button label="Результаты теста" icon={<ArrowRight />} onClick={(e) => {
                            e.stopPropagation()
                            resultOnClick(item)
                        }} />
                    </div>
                )}
            </div>
        </div>
    )
})