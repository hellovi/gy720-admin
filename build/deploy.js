/**
 * 部署静态文件
 * @author lmh
 * @description 打包后自动部署静态文件到后端项目的对应目录中
 * @version 2017-06-13
 */

const path = require('path')
const fs = require('fs-extra')
const { promisify } = require('util')
const { assetsSubDirectory } = require('../config').build;

// dist路径
const DIST_PATH = path.resolve(__dirname, '../dist')
// laravel项目路径
const LARAVEL_PATH = path.resolve(__dirname, '../../gy720.laravel')

// 复制dist中的静态文件到laravel项目中的public文件夹中
const ASSETS_PATH = path.join(DIST_PATH, assetsSubDirectory)
const PUBLIC_PATH = path.join(LARAVEL_PATH, 'public', assetsSubDirectory)

// 提交变更带到git并推送
const git = require('simple-git')(LARAVEL_PATH)

git
  .exec(() => console.log('pulling updates...'))
  .pull('origin', 'develop')
  .exec(() => {
    // 复制前先清空laravel中的相关文件夹
    console.log('delete files...')
    fs.emptyDirSync(PUBLIC_PATH)

    console.log('copying assets...')
    fs.copySync(ASSETS_PATH, PUBLIC_PATH)

    // 复制dist中的html文件到laravel中的模板文件夹中
    const HMTL_PATH = path.join(DIST_PATH, 'index.html')
    const TEMPLATE_PATH = path.join(LARAVEL_PATH, 'resources/views/vue/index.blade.php')
    console.log('copying index.html...')
    fs.copySync(HMTL_PATH, TEMPLATE_PATH)
  })
  .add('./*')
  .commit('更新前端静态资源')
  .exec(() => console.log('pushing updates...'))
  .push('origin', 'develop')
  .exec(() => console.log('deploy successfully!'))
