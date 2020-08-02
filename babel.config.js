module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: '3',
      targets: {
        browsers: [
          'last 5 versions',
          'ie >= 8',
        ],
      },
    }],
  ],
};
