module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            // 2. Configuration for concatinating files goes here.
            dist: {
                src: [
                    'js/libs/*.js', // All JS in the libs folder
                    'js/script.js'  // This specific file
                ],
                dest: 'js/build/production.js',
            }
        },

        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            }
        },

        less: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/style.css': 'css/style.less'
                }
            } 
        },

        autoprefixer: {
            single_file: {
                options: {
                    // Target-specific options go here.
                },
                src: 'css/style.css',
                dest: 'css/style.css'
            },
        },

        connect: {
            server: {
                options: {
                    bases: ['.'],
                    port: 9000,
                    hostname: "0.0.0.0",
                    middleware: function(connect, options) {
                      var middlewares = [];
                      if (!Array.isArray(options.base)) {
                        options.base = [options.base];
                      }
                      var directory = options.directory || options.base[options.base.length - 1];
                      options.base.forEach(function(base) {
                        // Serve static files.
                        middlewares.push(connect.static(base));
                      });
                      // Make directory browse-able.
                      middlewares.push(connect.directory(directory));
                      
                      // ***
                      // Not found - just serve index.html
                      // ***
                      middlewares.push(function(req, res){
                        for(var file, i = 0; i < options.base.length; i++){
                          file = options.base + "/index.html"; 
                          if (grunt.file.exists(file)){
                            require('fs').createReadStream(file).pipe(res);
                            return; // we're done
                          }
                        }
                        res.statusCode(404); // where's index.html?
                        res.end();
                      });
                      return middlewares;
                    },
                }
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['index.html', 'views/*.html', 'js/*.js', 'css/*.less', 'css/style.css'],
                tasks: ['concat', 'less', 'autoprefixer'],
                options: {
                    spawn: false,
                },
            } 
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-less');       
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'less', 'autoprefixer']);
    grunt.registerTask('server', ['connect', 'watch']);

};
