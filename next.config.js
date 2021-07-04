const withImages = require('next-images')


module.exports = withImages(
  {
    webpack: (config, options) => {
      config.plugins.push(
        // add adapter for janus.js
        new options.webpack.ProvidePlugin({ adapter: 'webrtc-adapter' }),

      )
      config.node.fs = "empty"
      return config
    }
  }
)