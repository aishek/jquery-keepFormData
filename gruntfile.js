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
        files: 'src/*.js-source',
        tasks: ['concat', 'closure-compiler']
      }
    },
    concat: {
      dist: {
        src: [
          'src/namespace.js-source',
          'src/util.js-source',
          'src/input.js-source',
          'src/select.js-source',
          'src/checkbox.js-source',
          'src/radio.js-source',
          'src/form.js-source',
          'src/plugin.js-source'
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