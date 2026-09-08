import { Route } from "react-router-dom";
import { TestIntro } from "../../components/testsPage/TestIntro";
import { TestViewer } from "../../components/testsPage/TestViewer";
import { TEST_CONFIGS } from "./testConfigs";
export const TestRoutes = () => (
    <>
        {TEST_CONFIGS.map((config) => (
            <Route key={config.id} path={`${config.path}`}>
                {/* Main test page */}
                <Route index element={<config.testComponent />} />
                
                {/* Results page */}
                <Route path="results" element={<config.resultsComponent />} />
                
                {/* Introduction page */}
                <Route 
                    path="intro" 
                    element={
                        <TestIntro 
                            testDescriptionPath={config.descriptionPath} 
                            testNavigation={`/tests/${config.path}`} 
                        />
                    } 
                />
            </Route>
        ))}
    </>
)