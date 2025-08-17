import "./App.css";
import { useVolatility } from "./hooks/useVolatility";
import { VolatilityChart } from "./components/VolatilityChart";

function App() {
	const { data, isLoading, isError } = useVolatility({
		currency: 'ETH',
		days: 1095,
	});



	return (
		<>
			<header>
				<div></div>
			</header>
			<main>
				<div className="ellipsis" />
				<section>
					<h1>ETH Volatility Index</h1>
					{isLoading && <p className="loadingText">Loading volatility data...</p>}
					{isError && <p className="errorText">Error loading data - check console</p>}
					{data && <VolatilityChart data={data} height={500} />}
				</section>
			</main>
			<footer>
				<div />
			</footer>
		</>
	);
}

export default App;
