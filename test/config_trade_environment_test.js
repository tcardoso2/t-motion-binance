profiles = {
  default: {
  	TradingProxyEnvironment: {
      key: "key",
      secret: "secret",
      endpoint: "endpoint1",
      isMockMode: true
    },
    TradeProxyDetector: {
    }
  }
}

exports.profiles = profiles;
exports.default = profiles.default;