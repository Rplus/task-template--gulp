task-template--gulp
==

弄個共用的 `gulpfile.js`  
以便未來能快速建立測試頁面  
也順便試試一些前端工具的操作

## 結構：  

source 檔都擺在 `app/` 裡頭  
deploy 時會摻一起送到 `_publish/` 下  
並會自動在 github repo 開個 branch `gh-pages`  
可以透過 `http://<username>.github.io/<repo-name>` 看到生成的結果

大概就這樣~


## task:

+ `html`: 簡單地 minify

+ `css`: 處理 autoprefixer + minify  
  個人習慣用 `stylus` ，有其它愛好者請自行更換

+ `js`: concat + uglify + jshint

+ `png-min`: 因為 `gulp-imagemin` 要裝的東西實在是太多了，所以只裝了 `optipng` 處理 png loseless minify  
  若圖片不想被壓縮，請在 png 圖檔名後綴 `-no-compress`

+ `iconfont`: 處理 svg2font 的工作，  
  (預設)把 svg 檔放到 `app/font/svg` 下執行 `gulp iconfont` 就能生成 icon font  
  並且能依 `_font.styl-temp` 生成一份 stylus 檔  
  目前是寫成 mixin + chart-map + placeholder 的形式，  
  要用時，再 include 就好，這部份的範例可以切到 `test-iconfont` 的 branch 上看

+ `server`, `watch`: 執行 `dulp dev` 可 localhost 並處理 livereload

+ `deploy`: 將目前 branch 的內容丟到 github brach `gp-pages` 上，可當簡易的靜態網頁 host  
  ex: iconfont test page: <http://rplus.github.io/task-template--gulp/>
