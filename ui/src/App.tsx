import { useEffect } from "react";
import "./App.css";
import { useDeribitVolatility } from "./hooks/useDeribitVolatility";

function App() {
	// Using timestamps from your curl example
	const startTimestamp = 1719870000000; // July 1, 2024
	const endTimestamp = 1720060000000;   // July 3, 2024

	const { data, isLoading, error, isError } = useDeribitVolatility({
		currency: 'ETH',
		startTimestamp,
		endTimestamp,
		resolution: 86400, // 1 day
	});

	useEffect(() => {
		if (data) {
			console.log('Deribit Volatility Data:', data);
		}
	}, [data]);

	useEffect(() => {
		if (isError && error) {
			console.error('Error fetching Deribit data:', error);
		}
	}, [isError, error]);

	return (
		<>
			<header>
				<div></div>
			</header>
			<main>
				<div className="ellipsis" />
				<section>
					{isLoading && <p>Loading volatility data...</p>}
					{isError && <p>Error loading data - check console</p>}
					{data && <p>Data loaded - check console for details</p>}
				</section>
			</main>
			<footer>
				<div />
			</footer>
		</>
	);
}

export default App;
