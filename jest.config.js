import { createDefaultPreset } from "ts-jest"

const tsJestTransformCfg = createDefaultPreset({
  useESM: true
}).transform

export default {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg
  },
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  testTimeout: 30000
}