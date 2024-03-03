import path from 'path';
import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin';
const webpack = require('webpack'); // eslint-disable-line


export default {
  plugins: [
    ['@nimble/ctv-build-firebolt'],
  ],

  webpack(config, env, helpers) {
    
	config.output = {
		...config.output,
		path: path.join(__dirname, 'build'),
		chunkFilename: '[id].js',
	}
	config.resolve.plugins = [
		new TsconfigPathsWebpackPlugin({
			configFile: path.resolve(process.cwd(), './tsconfig.json'),
		}),
	];

	config.devServer = {
		...config.devServer,
		static: {
			directory: path.join(__dirname, 'src'),
		},
		compress: true,
		port: 9000,
		hot: false,
		client: {
			overlay: {
				errors: true,
				warnings: false,
				runtimeErrors: true,
			},
		},
	}
  },
};
