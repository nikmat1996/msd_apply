import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import second from "./assets/download.png";

function App() {
	const [currentPage, setCurrentPage] = useState(0);

	// console.log('first console, currPageRef.current: ', currPageRef.current)

	useEffect(() => {
		const handleScroll = (() => {
			let lastEventTimestamp;
			return function (event) {
				// console.log("Inside handleScroll, current page is: ", currPageRef.current);
				const now = Date.now();
				if (!lastEventTimestamp || now - lastEventTimestamp >= 100) {
					if (event.deltaY > 0) {
						// Scrolling forward (downward)
						setCurrentPage((curr) => (curr < 3 ? curr + 1 : curr));
					} else if (event.deltaY < 0) {
						// Scrolling backward (upward)
						setCurrentPage((curr) => (curr > 0 ? curr - 1 : curr));
					}

					lastEventTimestamp = now;
				}
			};
		})();
		window.addEventListener("wheel", handleScroll);

		return () => {
			window.removeEventListener("wheel", handleScroll);
		};
	}, []);

	const handleNext = () => {
		setCurrentPage((curr) => (curr < 3 ? curr + 1 : curr));
	};

	const handleBack = () => {
		setCurrentPage((curr) => (curr > 0 ? curr - 1 : curr));
	};

	function getClassName(index) {
		return `kids ${currentPage === index ? "active" : currentPage < index ? "next" : "previous"}`;
	}

	return (
		<>
			<div className="container">
				<section className={getClassName(0)}>
					<span>0</span>
				</section>
				<section className={getClassName(1)}>
					<span>1</span>
				</section>
				<section className={getClassName(2)}>
					<span>2</span>
				</section>
				<section className={getClassName(3)}>
					<span>3</span>
				</section>
				<button onClick={handleBack}>back</button>
				<button onClick={handleNext}>next</button>
			</div>
		</>
	);
}

export default App;
