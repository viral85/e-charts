import React, { useRef, useState } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import Modal from "./Modal/Modal";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = ({ chartData }) => {
	const [name, setName] = useState("");
	const [comment, setComment] = useState("");
	const [selectedId, setSelectedId] = useState(null);
	const [modalVisibility, setModalVisibility] = useState(false);
	const labels = chartData.map((e) => e.data_id);
	const barData = chartData.map((e) => e.bar_count);
	const commentData = chartData
		.map((e) => e.comments)
		.map((el) => el.map((ele) => ele.username + " - " + ele.comment));
	const commentLength = chartData.map((e) => e.comments);
	const chartRef = useRef();
	const data = {
		labels: labels,
		datasets: [
			{
				label: "No. of Comments",
				data: barData,
				backgroundColor: ["rgba(75, 192, 192, 0.2)"],
				borderColor: ["rgba(75, 192, 192)"],
				borderWidth: 1,
			},
		],
	};
	const options = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: "Comments Chart",
			},
			legend: {
				position: "top",
			},
			tooltip: {
				enabled: false,
				external: function (context) {
					let tooltipEl = document.getElementById("chartjs-tooltip");

					if (!tooltipEl) {
						tooltipEl = document.createElement("div");
						tooltipEl.id = "chartjs-tooltip";
						tooltipEl.innerHTML = "<table></table>";
						document.body.appendChild(tooltipEl);
					}
					const tooltipModel = context.tooltip;
					if (tooltipModel.opacity === 0) {
						tooltipEl.style.opacity = 0;
						return;
					}

					tooltipEl.classList.remove("above", "below", "no-transform");
					if (tooltipModel.yAlign) {
						tooltipEl.classList.add(tooltipModel.yAlign);
					} else {
						tooltipEl.classList.add("no-transform");
					}

					function getBody(bodyItem) {
						console.log(tooltipEl);
						bodyItem.lines =
							"Comments - " + commentLength[tooltipModel.title[0] - 1].length;
						bodyItem.after = commentData[tooltipModel.title[0] - 1];
						return [bodyItem.after, bodyItem.lines];
						// return { bodyItem: { after: bodyItem.after, lines: bodyItem.lines } };
						// return bodyItem.after;
					}

					if (tooltipModel.body) {
						const titleLines = tooltipModel.title || [];
						const bodyLines = tooltipModel.body
							.map(getBody)
							.flat(1)
							.map((e) => ` &#8594; ${e}`);

						let innerHtml = "<div>";
						titleLines.forEach(function (title) {
							innerHtml += "<h2>No. " + title + "</h2>";
						});
						innerHtml += "</div><div>";

						bodyLines.forEach(function (body) {
							const span = "<p>";
							innerHtml += "</p><div>" + span + body + "</div>";
						});
						innerHtml += "</div>";

						let tableRoot = tooltipEl.querySelector("table");
						tableRoot.innerHTML = innerHtml;
					}

					const position = context.chart.canvas.getBoundingClientRect();
					tooltipModel.xAlign = "center";
					tooltipEl.style.fontSize = "14px";
					tooltipEl.style.backgroundColor = "rgba(75, 192, 192, 0.6)";
					tooltipEl.style.width = "200px";
					tooltipEl.style.border = "1px solid lightgray";
					tooltipEl.style.opacity = 1;
					tooltipEl.style.position = "absolute";
					tooltipEl.style.left =
						position.left + window.pageXOffset + tooltipModel.caretX + "px";
					tooltipEl.style.top =
						position.top + window.pageYOffset + tooltipModel.caretY - 50 + "px";
					tooltipEl.style.padding =
						tooltipModel.padding + "px " + tooltipModel.padding + "px";
					tooltipEl.style.pointerEvents = "none";
				},
			},
		},
	};

	const handleClick = (e) => {
		const barId = getElementAtEvent(chartRef.current, e)[0].index;
		setSelectedId(barId);
	};

	const handlePostComment = () => {
		console.log(selectedId + 1);
		axios
			.post("https://2ec8-2409-4041-2e0e-1302-e69b-2e5e-d189-5c09.ngrok.io/leave-comments", {
				data_id: selectedId + 1,
				user_name: name,
				comment: comment,
			})
			.then(() => window.location.reload());
	};

	return (
		<div className="chart-wrapper">
			<Bar
				ref={chartRef}
				data={data}
				options={options}
				onClick={(e) => {
					setModalVisibility(true);
					handleClick(e);
				}}
			/>
			<Modal
				handleClose={() => {
					setModalVisibility(false);
				}}
				setModalVisibility={modalVisibility}>
				<div className="modal-content">
					<label htmlFor="userName"></label>
					<input
						placeholder="Add user name"
						name="userName"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<label htmlFor="comment"></label>
					<input
						placeholder="Add comment"
						name="comment"
						type="text"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
				</div>
				<button
					onClick={() => {
						handlePostComment();
						setModalVisibility(false);
						setName("");
						setComment("");
						setSelectedId(null);
					}}>
					Submit
				</button>
			</Modal>
		</div>
	);
};

export default Chart;
