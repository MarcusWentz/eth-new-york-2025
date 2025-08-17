import { defineChain } from "viem";
import { createConfig, http } from "wagmi";

export const unichainSepolia = defineChain({
	id: 1301,
	name: "Unichain Sepolia",
	nativeCurrency: {
		decimals: 18,
		name: "Ether",
		symbol: "ETH",
	},
	rpcUrls: {
		default: {
			http: ["https://unichain-sepolia.drpc.org"],
		},
	},
	blockExplorers: {
		default: {
			name: "Unichain Sepolia Explorer",
			url: "https://unichain-sepolia.blockscout.com",
		},
	},
	testnet: true,
});

export const config = createConfig({
	chains: [unichainSepolia],
	transports: {
		[unichainSepolia.id]: http("https://unichain-sepolia.drpc.org"),
	},
});
