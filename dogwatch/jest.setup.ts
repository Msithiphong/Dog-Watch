jest.mock("expo-image", () => {
  const { Image } = require("react-native");
  return { Image };
});

jest.mock("expo-symbols", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    SymbolView: ({ fallback }: { fallback?: React.ReactNode }) =>
      fallback ?? React.createElement(Text, null, ""),
  };
});
