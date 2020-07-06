const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "/contracts"),
  networks: {
    rinkeby: {
      host: "localhost", // Connect to geth on the specified
      port: 8545,
      from: "0x39F5A9C83F2E8BD9446a7a138762C53cd5cf1668", // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
      gas: 4612388 // Gas limit used for deploys
    }
  },
  compilers: {
    solc: {
      version: "^0.4.20",
      parser: "solcjs",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
      }
    }
  }
};
