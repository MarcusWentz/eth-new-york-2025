import { createAppKit } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WagmiProvider } from "wagmi";

import App from "./App";
import { networks, projectId, wagmiAdapter } from "./config";

createAppKit({
	adapters: [wagmiAdapter],
	projectId,
	networks,
  // temp commented out
	// metadata,
	themeMode: "light" as const,
	themeVariables: {
		"--w3m-accent": "#000000",
	},
	features: {
		analytics: true,
		email: false,
		socials: false,
	},
});
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<WagmiProvider config={wagmiAdapter.wagmiConfig}>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</WagmiProvider>
	</StrictMode>,
);
