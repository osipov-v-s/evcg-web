import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/reusable/button";
import { ArrowLeft } from "lucide-react";

interface TestResultLayoutProps {
    children: ReactNode
    title?: string
}

export const TestResultLayout = ({children, title} : TestResultLayoutProps) => {
    const navigate = useNavigate()
    return(
        <div className="result-wrapper">
            {title && <h3>{title}</h3>}
            {children}
            <div>
                <Button label="Назад" icon={<ArrowLeft />} onClick={() => navigate("/tests")}/>
            </div>
        </div>
    )
}