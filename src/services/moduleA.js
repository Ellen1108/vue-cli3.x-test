/* moduleA.js */
import Http from './http'

// 获取测试数据
export const getTestData = () => {
    return Http.get('https://github.com/DavidGAW/vue-cli3.x-test')
}