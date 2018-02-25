profiles = {
  default: {
  	TradingProxyEnvironment: {
      key: "key",
      secret: "secret",
      endpoint: "endpoint1",
      isMockMode: true
    },
    MotionDetector: {
    }
  }
}

exports.profiles = profiles;
exports.default = profiles.default;