import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application; it's the first file
   * that runs in the main process.
   */
  entry: './src/index.ts',
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
  // Exclude unnecessary modules related to PostgreSQL that are not needed for SQLite
  externals: {
    sequelize: 'commonjs sequelize',
    pg: 'commonjs pg',          // Exclude the pg module
    'pg-hstore': 'commonjs pg-hstore', // Exclude pg-hstore module
  },
};

export default mainConfig;
