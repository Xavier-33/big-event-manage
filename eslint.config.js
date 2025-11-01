import { defineConfig } from 'eslint/config';
import globals from "globals";
import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import stylistic from '@stylistic/eslint-plugin';


export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}']
  },
  
  {
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: "module",
			globals: {
				...globals.browser,
				...globals.node,
				// myCustomGlobal: "readonly",
        ElMessage: 'readonly',
        ElMessageBox: 'readonly',
        ElLoading: 'readonly'
			}
		}
    // ...other config
  },

  // 自定义规则1
  {
    plugins: {
      stylistic
    },
    rules: {
      "stylistic/comma-dangle": "warn"
    }
  },

  // 自定义规则2
  {
    rules: {
      semi: "warn"
    }
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting
])
