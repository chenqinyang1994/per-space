const path = require('path');

module.exports = {
    mode: 'development',
    devServer: {
        port: 3148,
        open: true,
        progress: true,
        compress: true, // 开启gzip
        contentBase: path.resolve(__dirname, '../dist')
    }
}