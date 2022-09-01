import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Chart from "./components/Chart";

function App() {
	const [chartData, setChartData] = useState([]);
	const handleSubmit = useCallback(async () => {
		const data = await axios.get(
			"https://2ec8-2409-4041-2e0e-1302-e69b-2e5e-d189-5c09.ngrok.io/get-data",
		);
		setChartData(data?.data.data);
	}, []);

	useEffect(() => {
		handleSubmit();
	}, [handleSubmit]);

	return <div className="modal">{chartData.length > 0 && <Chart chartData={chartData} />}</div>;
}

export default App;
