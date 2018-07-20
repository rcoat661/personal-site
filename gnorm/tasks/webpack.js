'use strict'
const config = require('../config').scripts
const gulp = require('gulp')
const gutil = require('gulp-util')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config.js')

gulp.task('webpack', [])


//PRODUCTION
gulp.task('webpack:build', function(callback) {
	// modify some webpack config options
	let myConfig = Object.create(webpackConfig)
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin(config.uglifyOptions)
	)

	webpack(myConfig, function(err, stats) {
		if (err) {
			throw new gutil.PluginError('webpack:build', err)
		}
		gutil.log('[webpack:build]', stats.toString({
			colors: true,
			version: false,
			hash: false,
			timings: false,
			chunks: false,
			modules: false,
			chunkModules: false
		}))
		callback()
	})
})


//DEVELOPMENT
// modify some webpack config options
let myDevConfig = Object.create(webpackConfig)
myDevConfig.devtool = 'sourcemap'
myDevConfig.debug = true

// create a single instance of the compiler to allow caching
let devCompiler = webpack(myDevConfig)

gulp.task('webpack:build-dev', function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if (err) {
			throw new gutil.PluginError('webpack:build-dev', err)
		}
		gutil.log('[webpack:build-dev]', stats.toString({
			colors: true,
			version: false,
			hash: false,
			timings: false,
			chunks: false,
			modules: false,
			chunkModules: false
		}))
		callback()
	})
})
