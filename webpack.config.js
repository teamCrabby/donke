module.exports = {
    entry : './client/index.js',
    mode : 'development',
    output : {
        path : __dirname + '/public',
        filename : 'bundle.js',
    },
    target: 'electron-renderer',
    devtool : 'source-maps',
    module : {
        rules : [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ] 
    } 
}
