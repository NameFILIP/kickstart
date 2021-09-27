const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const mnemonicPhrase =
  "xxx";

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  providerOrUrl:
    "https://rinkeby.infura.io/v3/yyy",
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: `0x${compiledFactory.evm.bytecode.object}` })
    .send({
      from: accounts[0],
      gas: '5000000',
    });

  console.log("Contract deployed to", result.options.address);

  provider.engine.stop();
};

deploy();

// Deployed to 0x9F902E8517f4F13172a68427e973B99aBb119783
// Another one to 0xEE1e5bE2991cDba8d90b103687B5A2a270293c18