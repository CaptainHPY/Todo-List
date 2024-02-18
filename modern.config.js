import { appTools } from '@modern-js/app-tools';
import {defineConfig} from '@modern-js/app-tools';

// https://modernjs.dev/en/configure/app/usage
module.exports = {
  runtime: {
    router: true,
  },
  plugins: [appTools()],
};

export default defineConfig ({
    output: { // 配置静态资源打包路径
        assetPrefix: '../../'
    },
    tools: { // 清除console日志
        terser: opt => {
            if (typeof opt.terserOptions.compress === 'object') {
                opt.terserOptions.compress.drop_console = true;
              }
        }
    }
})
