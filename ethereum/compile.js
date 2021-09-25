const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");



const contractName = "Campaign.sol";

const input = {
  language: "Solidity",
  sources: {
    [contractName]: {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const result = JSON.parse(solc.compile(JSON.stringify(input)));
const output = result.contracts[contractName];

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, `${contract}.json`),
    output[contract]
  );
}