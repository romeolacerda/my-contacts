import pluginJs from "@eslint/js";
import globals from "globals";

export default [
    { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    {
        rules: {
            "class-methods-use-this": "off",
            "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
        },
    },
];
