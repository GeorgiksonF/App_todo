module.exports = {
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