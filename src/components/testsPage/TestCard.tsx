import "./css/cardBase.css"
import "./css/cardContent.css"
import "./css/cardResult.css"

import { FC, memo } from "react"
import { Stage, TestItem } from "./TestsData"
import { Timer, FileQuestion, ArrowRight, CheckCheck } from "lucide-react"

interface TestItemProps {
    item: TestItem
    dataId: string
    index: number
    isAvailable?: boolean
    isComplete?: boolean
    onClick: (path: string) => void
    resultOnClick: (item: TestItem) => void
    stage?: Stage
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
    stage
}) => {
    const handleClick = () => {
        if (!isAvailable) return
        if (item.path) onClick(item.path)
    }
    const renderButtons = () => {
        if (stage === 0) {
            return (
            <div className="flex flex-row gap-2">
                <button
                    type="button"
                    className="test-selection-result"
                    style = {{background: "var(--accent-color-500)", color: "white"}}
                    onClick={handleClick}>
                    До VR Начать
                </button>
                <button
                    type="button"
                    className="test-selection-result"
                    disabled={true}>
                    После VR
                </button>
            </div>)
        }
        if (stage === 1) {
            return (
                <div className="flex flex-row gap-2">
                    <button
                        type="button"
                        className="test-selection-result"
                        onClick={() => resultOnClick(item)}>
                        До VR Результаты
                    </button>
                    <button
                        type="button"
                        className="test-selection-result"
                        style = {{background: "var(--accent-color-500)", color: "white"}}
                        onClick={handleClick}>
                        После VR Начать
                    </button>
                </div>
            )
        }
        //if test is not complete no need buttons, 
        // also check if this VR it CAN be not completed but be at stage 1
        //if (!isComplete && stage !== 1) return null
        // if test complete or stage 2 for VR legacy support
        if (isComplete || stage === 2) {
            return (
                <button 
                    type="button" 
                    className="test-selection-result" 
                    onClick = {() => resultOnClick(item)}>
                    <h4>Результаты</h4>
                    <div className="test-selection-decal">
                        <ArrowRight/>
                    </div>
                </button>
            )
        }
    }
    
    return (
        <div className="test-card-wrapper">
            <button
                type="button"
                className={`test-selection-item ${!isAvailable ? "locked" : ""} ${isComplete ? "complete" : ""}`}
                disabled={!isAvailable}
                onClick={handleClick}
                data-test-id={dataId}>

                <div className="hover-circle" />

                <div className="test-selection-item-label">
                    <div className="test-selection-item-name">
                        <h4>{item.label}</h4>
                        <span>{item.author}</span>
                        {item.stage !== undefined && <span>{`Выполнено ${item.stage} / 2`}</span>}
                    </div>
                </div>

                <div className="test-selection-item-info">
                    <div className="test-selection-item-hint">
                        <Timer />
                        <span>{item.time} {getDeclension(item.time, ["минута", "минуты", "минут"])}</span>
                    </div>

                    <div className="test-selection-item-hint">
                        <FileQuestion />
                        <span>{item.questionscount} {getDeclension(item.questionscount, ["вопрос", "вопроса", "вопросов"])}</span>
                    </div>
                </div>

                <div className="test-selection-decal">
                    {isComplete ? <CheckCheck /> : <ArrowRight />}
                </div>
            </button>
            {/*+Легаси условия, stage для VR тестов с этапами, у них футер отличается в зависимости от этапа*/ }
            
            {renderButtons()}
        </div>
    )
})