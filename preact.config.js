import webpack from 'webpack';
import path from 'path';
import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin';

export default (config) => {
	config.plugins.unshift(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
        'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV || ''),
		'process.env.DEVICE_WIDTH': JSON.stringify(process.env.DEVICE_WIDTH || ''),
		'process.env.DEVICE_HEIGHT': JSON.stringify(process.env.DEVICE_HEIGHT || ''),
        'process.env.MOUSE_ENABLED': JSON.stringify(process.env.MOUSE_ENABLED || '',
        ),
      }),
    );

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
		hot:false,
		client: {
			overlay: {
				errors: true,
				warnings: false,
				runtimeErrors: true,
			},
		},
	}

};
