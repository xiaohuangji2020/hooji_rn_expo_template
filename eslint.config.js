// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const reactNative = require("eslint-plugin-react-native");
const stylistic = require("@stylistic/eslint-plugin");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      "react-native": reactNative,
      "@stylistic": stylistic,
    },
    rules: {
      // ========== React Native 样式规则 ==========

      // 禁止未使用的样式
      "react-native/no-unused-styles": "error",

      // StyleSheet 样式属性排序（字母顺序）
      "react-native/sort-styles": ["warn", "asc"],

      // 关闭内联样式和颜色字面量检查（可根据需要开启）
      "react-native/no-inline-styles": "off",
      "react-native/no-color-literals": "off",

      // ========== 样式格式规则 ==========

      "@stylistic/key-spacing": [
        "error",
        {
          beforeColon: false,
          afterColon: true,
        },
      ],

      "@stylistic/object-curly-spacing": ["error", "always"],

      "@stylistic/comma-spacing": [
        "error",
        {
          before: false,
          after: true,
        },
      ],
    },
  },
  {
    ignores: ["dist/*", "android/*", "ios/*", "node_modules/*"],
  },
]);
