# 花枝丸 - Cosplay 相册

记录自己 Coser 生涯的乱七八糟

## 使用方式
1. 照片相册直接贴过来，随便分类，最好按照日期分类命名，确保展示顺序
2. 运行 `gen_main.js`，维护各个子目录下生成的 `meta.json` 文件和 `info.txt` 文件
3. 运行 `gen_meta.js`，在根目录下生成 `main.json`，用于相册项目的文件管理
4. 部署 `cosplay-gallery`，并链接到此项目

## 脚本
+ `gen_fast.py` 生成缩略图，加速网站访问
+ `gen_meta.js` 生成相册元文件，用于维护相册信息
+ `gen_main.js` 生成整个相册信息json，用于外部调用
