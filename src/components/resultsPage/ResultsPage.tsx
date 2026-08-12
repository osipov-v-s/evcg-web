import { FC, useEffect, useState } from "react";
import { TestItem, testsList } from "../testsPage/TestsData";
import { useAuth } from "../../contexts/AuthContext";
import "./css/resultsPageStyles.css";
import { TestResultResponse, TestTypeName } from "../../types/testTypes";
import { testApi } from "../../services/api/testApi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { NoResults } from "../ui/noResultComponent/NoResult";
import { PageHeader } from "../ui/common/PageHeader";

export const ResultsPage: FC = () => {
	//const [psychTest, setPsychTest] = useState<TestResultResponse | null>(null)
	const { getToken } = useAuth()
	const navigate = useNavigate()
	const [completedTests, setCompletedTests] = useState<TestItem[]>([])
	const [recentTests, setRecentTests] = useState<Record<string, TestResultResponse>>({})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const getAvailableTests = async () => {
			try {
				const token = getToken()
				const recentTestsTemp = await testApi.getRecentTests(token)
				setRecentTests(recentTestsTemp)
				setCompletedTests(testsList.filter((testItem => testItem.name in recentTestsTemp)))
			} catch (err) {
				toast.error("Не удалось загрузить пройденные тесты")
			} finally {
				setIsLoading(false)
			}
		}
		getAvailableTests()
	}, [])

	const handleSelectTest = async (selectedTest: TestItem) => {
		try {
			if (!selectedTest.pathResults) {
				console.error(`Путь к тесту ${selectedTest.name} не найден`)
				toast.error(`Путь к тесту ${selectedTest.name} не найден`)
				return
			}
			navigate(selectedTest.pathResults, {
				state: {
					isViewMode: true,
					psychTest: recentTests[selectedTest.name],
				},
			});
		} catch (err) {
			console.error(err)
			toast.error("Возникла ошибка при загрузке теста")
		}
	}

	if (isLoading) return <NoResults variant="loading" message="Загружаем результаты…" />
	if (completedTests.length === 0) return <NoResults variant="empty" title="Результатов пока нет" message="Сначала пройдите один из доступных психологических тестов." />

	return (
		<div className="results-wrapper">
			<PageHeader title="Результаты тестов" description="Выберите тест, чтобы открыть его специализированную расшифровку." />
			<div className="tests-container">

				{completedTests.map((test) => (
					<button type="button" className="test-result-card" key={test.id} onClick={() => handleSelectTest(test)}>

						<div className="test-result-title">
							<h3>{test.label}</h3>
						</div>

						<p>{test.description}</p>
					</button>
				))}
			</div>

			<Toaster />
		</div>
	);
};
