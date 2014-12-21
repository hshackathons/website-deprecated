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

        express: {
            server: {
                options: {
                    bases: ['.'],
                    port: 9000,
                    hostname: "0.0.0.0"
                }
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['index.html', 'views/*.html', 'js/*.js', 'css/*.less', 'css/style.css'],
                tasks: ['concat', 'less'],
                options: {
                    spawn: false,
                },
            } 
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-less');       
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'less']);
    grunt.registerTask('server', ['express', 'watch']);

};
