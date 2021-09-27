# CrowdCoin

## Getting Started

1. Create a following `credentials.js` file in the `ethereum` folder:

```
module.exports = {
  MNEMONIC_PHRASE: "xxx",
  INFURA_ENDPOINT_RINKEBY: "yyy",
};
```

2. Run `npm install`
3. Run `npm run dev`
4. Go to http://localhost:3000

### Compile Contract

```
node ethereum/compile.js
```

### Deploy Contract

```
node ethereum/deploy.js
```

Then copy the address where the contract was deployed to the `ethereum/factory.js`
