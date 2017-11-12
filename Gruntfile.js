module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        express: {
            prototype: {
                options: {
                    port: 1508,
                    hostname: "0.0.0.0",
                    bases: ['./build'],
                    livereload: true
                }
            }
        },
        uglify: {
//            options: {
//                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
//            },
            build: {
                expand: true,
                cwd: 'src/js/',
                src: ['*.js'],
                dest: 'build/js/',
                ext: '.min.js'
            }
        },
        copy: {
            markup: {
                files: [
                    {
                        src: '*.{html,php}',
                        dest: 'build/'
                    }
                ]
            },
            content: {
                files: [
                    {
                        src: '*.xml',
                        dest: 'build/xml/'
                    }
                ]
            }
//            images: { // Copy images (Because imagemin did not work??!)
//                files: [
//                    {
//                        expand: true,
//                        cwd: 'src/img/',
//                        src: '*',
//                        dest: 'build/img/'
//                    }
//                ]
//            }
        },
        open: {
            all: {
                // Gets the port from the connect configuration
                path: 'http://localhost:1508'
            }
        },
        watch: {
            sass: {
                files: ['src/sass/**/*.{scss,sass}', 'src/sass/**/*.{scss,sass}'],
                tasks: ['sass:dist'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['src/js/**'],
                tasks: ['uglify'],
                options: {
                    livereload: true
                }
            },
            markup: {
                files: ['*.html', '*.php'],
                tasks: ['copy:markup'],
                options: {
                    livereload: true
                }
            },
            content: {
                files: ['*.xml'],
                tasks: ['copy:content']
            }
        },
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 7,
                    svgoPlugins: [{
                        removeViewBox: false
                    }]
                },
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/img/'
                }]
            }
        },
        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    'build/css/styles.min.css': 'src/sass/styles.scss'
                }
            }
        }
    });


    // Default task(s).
    grunt.registerTask('default', ['sass', 'uglify', 'copy', 'express:prototype', 'open', 'watch']);
    grunt.registerTask('build', ['sass', 'uglify', 'copy']);
    grunt.registerTask('image', ['imagemin']);


    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
//    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-sass');
};