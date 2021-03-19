// generator
module.exports = (api, options, rootOptions) => {
  // 删除 vue-cli3 默认的 /src 和 /public 目录
  api.render(files => {
    Object.keys(files)
      .filter(path => path.startsWith('src/') || path.startsWith('public/'))
      .forEach(path => delete files[path])
  })

  // 安装一些基础公共库
  api.extendPackage({
    dependencies: {
      "stats-js": "^1.0.1",
      "axios": "0.18.1",
      "core-js": "^3.6.5",
      "element-ui": "2.13.0",
      "js-cookie": "2.2.0",
      "node-sass": "^4.14.1",
      "normalize.css": "7.0.0",
      "nprogress": "0.2.0",
      "path-to-regexp": "2.4.0",
      "sass-loader": "^9.0.3",
      "vue": "^2.6.11",
      "vue-router": "^3.2.0",
      "vuex": "^3.4.0"
    },
    devDependencies: {
      "@vue/cli-plugin-babel": "~4.5.0",
      "@vue/cli-plugin-eslint": "~4.5.0",
      "@vue/cli-plugin-router": "^4.5.4",
      "@vue/cli-plugin-vuex": "^4.5.4",
      "@vue/cli-service": "~4.5.0",
      "babel-eslint": "^10.1.0",
      "eslint": "^6.7.2",
      "eslint-plugin-vue": "^6.2.2",
      "vue-template-compiler": "^2.6.11"
    }
  });

  // 生成对应项目
  api.render('../template/template_pc')

  // 判断模板样式
  if (options.style == '顶部导航栏模板') {

    //注入对应文件
    api.render({
      './src/views/layout/Logo.vue': '../template/template_pc_style/horizontal/layout/Logo.vue',
      './src/views/layout/Breadcrumb.vue': '../template/template_pc_style/horizontal/layout/Breadcrumb.vue',
      './src/views/layout/Index.vue': '../template/template_pc_style/horizontal/layout/Index.vue',
      './src/views/layout/Menu.vue': '../template/template_pc_style/horizontal/layout/Menu.vue',
      './src/views/layout/Navbar.vue': '../template/template_pc_style/horizontal/layout/Navbar.vue',
      './src/views/layout/TreeFolder.vue': '../template/template_pc_style/horizontal/layout/TreeFolder.vue',
      './src/router/index.js': '../template/template_pc_style/horizontal/router/index.js'
    });

  } else if (options.style == '侧边导航栏模板') {

    //注入对应文件
    api.render({
      './src/views/layout/Logo.vue': '../template/template_pc_style/vertical/layout/Logo.vue',
      './src/views/layout/Breadcrumb.vue': '../template/template_pc_style/vertical/layout/Breadcrumb.vue',
      './src/views/layout/Index.vue': '../template/template_pc_style/vertical/layout/Index.vue',
      './src/views/layout/Menu.vue': '../template/template_pc_style/vertical/layout/Menu.vue',
      './src/views/layout/Navbar.vue': '../template/template_pc_style/vertical/layout/Navbar.vue',
      './src/views/layout/TreeFolder.vue': '../template/template_pc_style/vertical/layout/TreeFolder.vue',
      './src/router/index.js': '../template/template_pc_style/vertical/router/index.js'
    });

  }
}
