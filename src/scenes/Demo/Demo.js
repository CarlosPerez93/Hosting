import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { themes } from '../../theme-context';
import { Button, Spin } from 'antd';

export const Demo = () => {

	const { isLoading, error, data, refetch } = useQuery('obtenerPersonajes',
		() => fetch('https://rickandmortyapi.com/api/character')
			.then(res => res.json()), {
		refetchOnWindowFocus: false,
		enabled: false
	}
	)

	const handleFetch = () => {

		refetch();

	};


	return (
		<div>
			<Link to="/">Back</Link>
			<h1>CONTACT DETAIL</h1>
			{/* 			<div>{JSON.stringify(themes)}</div>
 */}			<div>
				{isLoading ?
					<Spin spinning={true}>
					</Spin> : data?.results.map(i => <p>{i.name}</p>)}     <p>Probando react query </p>
			</div>
			<Button onClick={handleFetch}>Fetch</Button>
		</div>
	);
};