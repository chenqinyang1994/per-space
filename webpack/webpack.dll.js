const path = require('path');
const DllPlugin = require('webpack').DllPlugin;

module.exports = {
    mode: 'production',
    entry: ['react', 'react-dom'],
    output: {
        filename: 'vendor.dll.js',
        path: path.resolve(__dirname, '../dll'),
        library: 'vendor'
    },
    plugins: [
        new DllPlugin({
            name: 'vendor',
            path: path.resolve(__dirname, '../dll/manifest.json')
        })
    ]
}