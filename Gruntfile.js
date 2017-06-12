module.exports = function(grunt){
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        precision: 5,
        sourcemap: 'none'
      },
      dev: {
        options: {
          style: 'nested', // compact, compressed, nested or expanded
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: './',
          src: ['src/css/*.scss'],
          flatten: false,
          ext: '.css',
          extDot: 'last',
          rename: function(dest, src) {
            return 'build/' + src.replace('src/', '');
          }
        }]
      },
      prod: {
        options: {
          style: 'compressed', // compact, compressed, nested or expanded
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: './',
          src: ['src/css/*.scss'],
          flatten: false,
          ext: '.css',
          extDot: 'last',
          rename: function(dest, src) {
            return 'build/' + src.replace('src/', '');
          }
        }]
      }
    },


    concat_css: {
      dev: {
        src: ["build/css/*.css"],
        dest: "dist/css/bundle.css"
      },
      prod: {
        src: ["build/css/*.css"],
        dest: "dist/css/bundle.css"
      }
    },

    import_js: {
      dev: {
        files: [{
          expand: true,
          flatten: false,
          cwd: './',
          src: ['src/js/*.js'],
          ext: '.js',
          rename: function(dest, src) {
            return 'build/' + src.replace('src/', '');
          }
        }]
      },
      prod: {
        files: [{
          expand: true,
          flatten: false,
          cwd: './',
          src: ['src/js/*.js'],
          ext: '.js',
          rename: function(dest, src) {
            return 'build/' + src.replace('src/', '');
          }
        }]
      }
    },


    babel: {
      options: {
        sourceMap: false,
        presets: ['babel-preset-es2015']
      },
      dev: {
        files: [{
          expand: true,
          flatten: false,
          cwd: './',
          src: ['src/js/*.es6'],
          ext: '.js',
          rename: function(dest, src) {
            return 'build/' + src.replace('src/', '').replace('.es6', '.es6.js');
          }
        }]
      },
      prod: {
        files: [{
          expand: true,
          flatten: false,
          cwd: './',
          src: ['src/js/*.es6'],
          ext: '.js',
          rename: function(dest, src) {
            return 'build/' + src.replace('src/', '').replace('.es6', '.es6.js');
          }
        }]
      }
    },


    uglify: {
      dev: {
        options: {
          beautify: true
        },
        files: {
          // Where to combine and minify JS files, followed by list of which files to include and exclude
          'dist/js/bundle.js' : ['build/js/*.js']
        }
      },
      prod: {
        files: {
          // Where to combine and minify JS files, followed by list of which files to include and exclude
          'dist/js/bundle.js' : ['build/js/*.js']
        }
      }
    },

    // Watch options: what tasks to run when changes to files are saved
    watch: {
      css: {
        files: ['src/css/*.scss'],
        tasks: ['sass:dev']
      },
      js: {
        files: ['src/js/*.js', '!js/*.min.js'], // Watch for changes in JS files except for *.min.js to avoid reload loops
        tasks: ['uglify:dev']
      }
		}
	});

  grunt.registerTask('default', ['sass:dev','concat_css:dev','babel:dev','import_js:dev','uglify:dev']);
  grunt.registerTask('watch', ['watch']);
  grunt.registerTask('dist', ['sass:prod','concat_css:prod','babel:prod','import_js:prod','uglify:prod']);
};