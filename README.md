# t-motion-binance
A binance API wrapper, to detect movements in currencies  

* v0.0.9: Continuing on implementation of syncronization (WIP);  
* v0.0.8: Working In Progress on synchronization between TradingProxyEnvironment and actual Binance API;  
* v0.0.7: Created first version of TradeProxyDetector, a wrapper for binance module;  
* v0.0.6: Working on APIEnvironment and storing/retrieving the key and secret in a local file (APIEnvironment to be part of t-motion-detector-cli module) - changed detpendency from t-motion-detector to t-motion-detector-cli;  
* v0.0.5: Upgraded dependency to t-motion-detector@0.5.17, to support originalIntensity; added methods to calculate balances and growth percentage;  
* v0.0.4: Created first version of PositionDetectors, which record buy currency positions; will require update to future t-motion-detector@0.5.17 dependency to be able to record Detector's original value; started adding documentation;  
* v0.0.3: First version of EnvironmentAccount; adding logging and creating main plugin; added t-motion-detector@0.5.16 as dependency;  
* v0.0.2: Adding more unit tests for EnvironmentAccount, CurrencyPairDetector, etc;  
* v0.0.1: First version initial test drafts;  
