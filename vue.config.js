const path = require('path')

module.exports = {
    chainWebpack: config => {
      config.plugin('copy')
            .tap(args => {
              args[0].push({
                from: path.resolve(__dirname, 'src/assets/svg'),
                to: path.resolve(__dirname, 'dist/assets/svg'),
                toType: 'dir',
                ignore: ['.DS_Store']
              })
              return args
            })
    },
    css: {
      loaderOptions: {  
        sass: {
          additionalData: `@import "~@/scss/_variables.sass"`
        },
        scss: {
          additionalData: `@import "~@/scss/_variables.scss";`
        },
      }
    }
  }