# ⛓️ Cross-Chain Volatility Hook 🪝
Dynamic fee Uniswap v4 Hook using cross-chain Chainlink volatility data via LayerZero

**Summary:** This project implements a Uniswap v4 hook that dynamically adjusts trading fees based on real-time volatility data sourced from multiple blockchains. By leveraging Chainlink's price feeds on Arbitrum and transmitting this data via LayerZero's cross-chain messaging protocol, the hook creates a more responsive and risk-adjusted fee structure for liquidity providers.

**Technical Architecture:** The system consists of three core components: a data ingestion contract on Arbitrum that reads Chainlink's ETH-USD 30-Day Realized Vol metric, a LayerZero bridge integration that securely transmits volatility data across chains with minimal latency, and a Uniswap v4 hook contract that receives cross-chain volatility updates and implements dynamic fee adjustments in the beforeSwap function.

## ETHGlobal NYC August 2025 Team
[Marcus Wentz](https://github.com/MarcusWentz)
[Dina Deljanin](https://github.com/dinadeljanin)
[Mylo Bennett](https://github.com/readyMouse)


## Leveraging the Uniswap v4 Hook Template
(original template README below)

This template provides a starting point for writing Uniswap v4 Hooks, including a simple example and preconfigured test environment. Start by creating a new repository using the "Use this template" button at the top right of this page. Alternatively you can also click this link:

[![Use this Template](https://img.shields.io/badge/Use%20this%20Template-101010?style=for-the-badge&logo=github)](https://github.com/uniswapfoundation/v4-template/generate)

1. The example hook [Counter.sol](src/Counter.sol) demonstrates the `beforeSwap()` and `afterSwap()` hooks
2. The test template [Counter.t.sol](test/Counter.t.sol) preconfigures the v4 pool manager, test tokens, and test liquidity.

<details>
<summary>Updating to v4-template:latest</summary>

This template is actively maintained -- you can update the v4 dependencies, scripts, and helpers:

```bash
git remote add template https://github.com/uniswapfoundation/v4-template
git fetch template
git merge template/main <BRANCH> --allow-unrelated-histories
```

</details>

### Requirements

This template is designed to work with Foundry (stable). If you are using Foundry Nightly, you may encounter compatibility issues. You can update your Foundry installation to the latest stable version by running:

```
foundryup
```

To set up the project, run the following commands in your terminal to install dependencies and run the tests:

```
forge install
forge test
```

### Local Development

Other than writing unit tests (recommended!), you can only deploy & test hooks on [anvil](https://book.getfoundry.sh/anvil/) locally. Scripts are available in the `script/` directory, which can be used to deploy hooks, create pools, provide liquidity and swap tokens. The scripts support both local `anvil` environment as well as running them directly on a production network.

### Troubleshooting

<details>

#### Permission Denied

When installing dependencies with `forge install`, Github may throw a `Permission Denied` error

Typically caused by missing Github SSH keys, and can be resolved by following the steps [here](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh)

Or [adding the keys to your ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#adding-your-ssh-key-to-the-ssh-agent), if you have already uploaded SSH keys

#### Anvil fork test failures

Some versions of Foundry may limit contract code size to ~25kb, which could prevent local tests to fail. You can resolve this by setting the `code-size-limit` flag

```
anvil --code-size-limit 40000
```

#### Hook deployment failures

Hook deployment failures are caused by incorrect flags or incorrect salt mining

1. Verify the flags are in agreement:
   - `getHookCalls()` returns the correct flags
   - `flags` provided to `HookMiner.find(...)`
2. Verify salt mining is correct:
   - In **forge test**: the _deployer_ for: `new Hook{salt: salt}(...)` and `HookMiner.find(deployer, ...)` are the same. This will be `address(this)`. If using `vm.prank`, the deployer will be the pranking address
   - In **forge script**: the deployer must be the CREATE2 Proxy: `0x4e59b44847b379578588920cA78FbF26c0B4956C`
     - If anvil does not have the CREATE2 deployer, your foundry may be out of date. You can update it with `foundryup`

</details>

### Additional Resources

- [Uniswap v4 docs](https://docs.uniswap.org/contracts/v4/overview)
- [v4-periphery](https://github.com/uniswap/v4-periphery)
- [v4-core](https://github.com/uniswap/v4-core)
- [v4-by-example](https://v4-by-example.org)

## Forge Deploy and Verify  

### Arbitrum Sepolia 

#### Deploy EthRealizedVolatility.sol 

```shell
forge create src/EthRealizedVolatility.sol:EthRealizedVolatility \
--private-key $devTestnetPrivateKey \
--rpc-url $arbitrumSepoliaHTTPS  \
--etherscan-api-key $arbiscanApiKey \
--broadcast \
--verify 
```

#### Deploy LayerZeroArbToUniOApp.sol

```shell
forge create src/LayerZeroArbToUniOApp.sol:LayerZeroArbToUniOApp \
--private-key $devTestnetPrivateKey \
--rpc-url $arbitrumSepoliaHTTPS  \
--etherscan-api-key $arbiscanApiKey \
--broadcast \
--verify 
```

### Unichain Sepolia

### EthUsd.sol

```shell
forge create src/EthUsd.sol:EthUsd \
--private-key $devTestnetPrivateKey \
--rpc-url https://sepolia.unichain.org \
--verify \
--verifier blockscout \
--verifier-url https://unichain-sepolia.blockscout.com/api/ \
--broadcast
```

### LayerZeroUniToArbOApp.sol

```shell
forge create src/LayerZeroUniToArbOApp.sol:LayerZeroUniToArbOApp \
--private-key $devTestnetPrivateKey \
--rpc-url https://sepolia.unichain.org \
--verify \
--verifier blockscout \
--verifier-url https://unichain-sepolia.blockscout.com/api/ \
--broadcast
```

### Verify Blockscout Contract Already Deployed

```shell
forge verify-contract \
--rpc-url https://sepolia.unichain.org \
<contract_address> \
<contract_file_path> \
--verifier blockscout \
--verifier-url https://unichain-sepolia.blockscout.com/api/
```

### Arbitrum Sepolia Deployments

#### EthRealizedVolatility.sol 

https://sepolia.arbiscan.io/address/0xeef4f98dd12fcc6193ccce792f3983803d0b56ed#code

#### LayerZeroArbToUniOApp.sol

https://sepolia.arbiscan.io/address/0xc26ea02fb53594952b64559278bd0622555584e4#code

### Unichain Sepolia Deployments

#### EthUsd.sol 

https://unichain-sepolia.blockscout.com/address/0xE00fAe47783A593f3975A13Dec9D957A437d1118?tab=contract

#### LayerZeroUniToArbOApp.sol

https://unichain-sepolia.blockscout.com/address/0x5eCe667D03F29695937F23178aBad9B89434D630?tab=contract
