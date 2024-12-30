import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tailwindcss from "eslint-plugin-tailwindcss";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("next/core-web-vitals"), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        tailwindcss,
    },

    languageOptions: {
        ecmaVersion: 2022,
        sourceType: "module",

        parserOptions: {
            parser: "@typescript-eslint/parser",
            project: ["./tsconfig.json"],
            tsconfigRootDir: ".",

            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    rules: {
        "tailwindcss/classnames-order": "off",
        "@typescript-eslint/no-explicit-any": "off",
    },
}, ...compat.extends(
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
).map(config => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"],
})), {
    files: ["**/*.ts", "**/*.tsx"],

    rules: {
        "@typescript-eslint/no-explicit-any": "off",
    },
}];