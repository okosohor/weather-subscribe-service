import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
// import n from 'eslint-plugin-n'

export default [{ignores: ['**/*.js']},...tseslint.config(
  

  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {

    files: ['**/*.{ts,mts,cts}'],
    // plugins: {n,},
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      // "node": 'off',
      // 'no-undef': ["warn", { "allow": ["warn", "error"] }],
      "max-warnings": "off",
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_"
        }
      ],
    }
    ,
  }
)]