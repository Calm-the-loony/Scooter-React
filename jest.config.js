module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy", // Мок для стилей
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/__mocks__/fileMock.js", // Мок для изображений
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // Конфигурация
};
