const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 9010,
    // 端口（可选，避免冲突）
    port: 8080,
    // 关闭IPv6，解决Windows下IP识别问题
    allowedHosts: 'all',
    // 禁用IPv6
    server: {
      type: 'http',
      options: {
        ipv6Only: false
      }
    }
  }
})
