## Get started
1. Install [node.js](https://nodejs.org/) and gulp globally

		npm install gulp -g

2. Install npm packages. If you have problems in browser-sync install on Windows look [here](http://www.browsersync.io/docs/#windows-users)

		npm i

	If you use link of global packages:

		npm install gulp rimraf gulp-jade gulp-sass gulp-plumber gulp-directory-sync browser-sync gulp-sourcemaps gulp-postcss postcss-assets autoprefixer gulp-rigger gulp-uglify gulp-csso gulp-svg-sprite gulp-svgmin gulp-cheerio gulp-replace -g

		npm link gulp rimraf gulp-jade gulp-sass gulp-plumber gulp-directory-sync browser-sync gulp-sourcemaps gulp-postcss postcss-assets autoprefixer gulp-rigger gulp-uglify gulp-csso gulp-svg-sprite gulp-svgmin gulp-cheerio gulp-replace

3. Let's code!

		gulp

4. Edit files in assets folder, see result in dist folder. If you want to build optimized version of project run:

		gulp build

## How to work with js

Create all your main scripts in assets/js. Load all your additional scripts (jquery,plugins, и т.д) in all.js. 

## How to make svg-sprite

1. Install packages

		npm install gulp-svg-sprite gulp-svgmin gulp-cheerio gulp-replace -D

2. Put your icons into i/icons folder
3. Run task svgSpriteBuild
4. Now you have sprite.svg in assets/i/sprite folder. By default you have svg4everybody script in your js. Also you have scss file _sprite.scss for styling sprite.
5. Run svg4everybody in your main.js file. For including icons use jade mixin "icon"

## Some js plugins which should be installed through npm

		npm install bootstrap wow.js svg4everybody flickity jarallax typed.js bs-custom-file-input @fancyapps/fancybox object-fit-images --save# lost_and_find
