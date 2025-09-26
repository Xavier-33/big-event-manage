import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import stylistic from '@stylistic/eslint-plugin'


export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', 'eslint.config.js']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  // 自定义规则
  {
    plugins: {
      stylistic,
    },
    rules: {
      "stylistic/comma-dangle": "warn",
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,
])
