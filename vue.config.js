module.exports = {
    lintOnSave: false,
    devServer: {
        //post:8080
        proxy: {
            "/dapi": {
                target: "http://m.kugou.com/",
                secure: false,
                changeOrigin: true, //允许跨域
                pathRewrite: {
                    "^/dapi": ""
                },
                headers: {
                    "User-Agent": "Mozilla/5.0 (Linux; Android 5.0.2; PLK-TL01H Build/HONORPLK-TL01H; wv) AppleWebKit/537.36(KHTML, like Gecko) Version/4.0 Chrome/45.0.2454.95 Mobile Safari/537.36"
                }
            },
            "/plist": {
                target: "http://m.kugou.com/plist",
                secure: false,
                changeOrigin: true, //允许跨域
                pathRewrite: {
                    "^/plist": ""
                },
                headers: {
                    "User-Agent": "Mozilla/5.0 (Linux; Android 5.0.2; PLK-TL01H Build/HONORPLK-TL01H; wv) AppleWebKit/537.36(KHTML, like Gecko) Version/4.0 Chrome/45.0.2454.95 Mobile Safari/537.36"
                }
            },
            "/app": {
                target: "http://m.kugou.com/app",
                secure: false,
                changeOrigin: true, //允许跨域
                pathRewrite: {
                    "^/app": ""
                },
                headers: {
                    "User-Agent": "Mozilla/5.0 (Linux; Android 5.0.2; PLK-TL01H Build/HONORPLK-TL01H; wv) AppleWebKit/537.36(KHTML, like Gecko) Version/4.0 Chrome/45.0.2454.95 Mobile Safari/537.36"
                }
            },

            "/api": {
                target: "http://r/api",
                secure: false,
                changeOrigin: true, //允许跨域
                pathRewrite: {
                    "^/api": ""
                }
            },
            "/v1": {
                target: "http://tools.mobile.kugou.com/api/v1",
                secure: false,
                changeOrigin: true, //允许跨域
                pathRewrite: {
                    "^/v1": ""
                }
            },
            "/v3": {
                target: "http://mobilecdn.kugou.com/api/v3",
                secure: false,
                changeOrigin: true, //允许跨域
                pathRewrite: {
                    "^/v3": ""
                }
            },

        }
    }
};