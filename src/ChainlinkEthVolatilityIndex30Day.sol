// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract ChainlinkEthVolatilityIndex30Day {
    AggregatorV3Interface internal dataFeed;

    // Data feed on Arbitrum Sepolia
    // https://docs.chain.link/data-feeds/rates-feeds/addresses?page=1&testnetPage=1&network=arbitrum
    constructor() {
        dataFeed = AggregatorV3Interface(
            0x0829a75e62c493409983fDa7098626beAD012862
        );
    }

    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
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
