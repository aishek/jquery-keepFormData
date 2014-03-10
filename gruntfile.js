'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      // Следим за файлами, выполняем таски при каждом изменении
      options: {
        // При вызове в терминале `grunt watch`
        // сначала выполнятся все таски и потом начнётся слежение
        atBegin: true
      },
      js: {
        // Все *.js файлы в папке src
        files: 'src/*.js',
        tasks: ['concat', 'closure-compiler']
      }
    },
    concat: {
      dist: {
        src: [
          'src/namespace.js.source',
          'src/util.js',
          'src/input.js',
          'src/select.js',
          'src/checkbox.js',
          'src/radio.js',
          'src/form.js',
          'src/plugin.js'
        ],
        dest: 'jquery.keepFormData.js'
      }
    },
    'closure-compiler': {
      frontend: {
        js: 'jquery.keepFormData.js',
        jsOutputFile: 'jquery.keepFormData.min.js',
        noreport: true,
        options: {}
      }
    }
  });

  // Загружаем установленные задачи
  // (офтопик: будь я разработчиком Гранта, выкинул бы этот блок)
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-closure-compiler');

  // Задача по умолчанию (`grunt` в терминале)
  grunt.registerTask('default', ['concat', 'closure-compiler']);
};