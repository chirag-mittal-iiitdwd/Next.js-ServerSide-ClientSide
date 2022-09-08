import React, { useEffect, useState } from "react";
import useSWR from "swr";

const LastSales = (props) => {
	const [sales, setSales] = useState(props.sales);

	const { data, error } = useSWR(
		"https://next-js-7c747-default-rtdb.firebaseio.com/Sales.json",
		(url) => fetch(url).then(res => res.json())
	);

	useEffect(() => {
		const transformedSales = [];
		for (const key in data) {
			transformedSales.push({
				id: key,
				username: data[key].username,
				volume: data[key].volume,
			});
		}
		setSales(transformedSales);
	}, [data]);

	if (error) {
		return <p>Failed to load</p>;
	}

	if (!data && !sales) {
		return <p>Loading...</p>;
	}

	return (
		<ul>
			{sales.map((sale) => (
				<li key={sale.id}>
					{sale.username} - ${sale.volume}
				</li>
			))}
		</ul>
	);
};

export async function getStaticProps() {
	const res = await fetch("https://next-js-7c747-default-rtdb.firebaseio.com/Sales.json");
	const data = await res.json();

	const transformedSales = [];
	for (const key in data) {
		transformedSales.push({
			id: key,
			username: data[key].username,
			volume: data[key].volume,
		});
	}

	return { props: { sales: transformedSales }};
}

export default LastSales;
