import { Route } from "react-router-dom"
import { TestIntro } from "../../components/testsPage/TestIntro"
import { TEST_CONFIGS } from "./testConfigs"

export const TestRoutes = () => (<>
    {TEST_CONFIGS.map((config) => (
        <Route key={config.id} path={`${config.path}`}>
            <Route index element={<config.testComponent />} />

            <Route path="results" element={<config.resultsComponent />} />

            <Route path="intro" element={<TestIntro testDescriptionPath={config.descriptionPath} testNavigation={`/tests/${config.path}`} />} />
        </Route>
    ))} </>
)