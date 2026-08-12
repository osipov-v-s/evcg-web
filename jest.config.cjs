module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/*.test.ts"],
    clearMocks: true,
    transform: {
        "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.json" }]
    }
}
