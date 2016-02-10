module.exports = function(grunt) {
  grunt.initConfig({
    jasmine: {
      src: '*.js',
      options: {
        specs: 'spec/*.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jasmine');
};
