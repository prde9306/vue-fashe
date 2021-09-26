module.exports = {
    outputDir: '../src/main/resources/static',
    devServer: {
        port:3030,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin:true,
                logLevel:'debug',
            }
        }
    }
}
