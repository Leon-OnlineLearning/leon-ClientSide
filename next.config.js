module.exports = {
    webpack: (config, options) => {
      config.plugins.push(
            // add adapter for janus.js
            new options.webpack.ProvidePlugin({ adapter: 'webrtc-adapter' })
      )
      return config
    },
  }
