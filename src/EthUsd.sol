// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

// @notice Remix IDE import
// import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
// @dev "forge install smartcontractkit/chainlink-brownie-contracts" 
// and set custom "chainlink" remapping:
// "chainlink/=lib/chainlink-brownie-contracts/contracts/src/"
import {AggregatorV3Interface} from "chainlink/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract EthUsd {
    AggregatorV3Interface internal dataFeed;

    // Data feed on Unichain Sepolia
    // https://docs.chain.link/data-feeds/price-feeds/addresses?page=1&testnetPage=1&network=unichain
    constructor() {
        dataFeed = AggregatorV3Interface(
            0xd9c93081210dFc33326B2af4C2c11848095E6a9a
        );
    }

    function getEthUsdChainlinkDataFeedLatestAnswer() public view returns (int) {
        (
            /* uint80 roundId */,
            int256 answer,
            /*uint256 startedAt*/,
            /*uint256 updatedAt*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        return answer;
    }
}
