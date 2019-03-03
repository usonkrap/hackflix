import React from 'react';
import SearchPresenter from './SearchPresenter';
import { moviesApi, tvApi } from 'api';

export default class extends React.Component {
	state = {
		movieResults: null,
		tvResults: null,
		searchTerm: '',
		loading: false,
		error: null
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { searchTerm } = this.state;
		if (searchTerm !== '') {
			this.searchByTerm(searchTerm);
		}
	};

	updateTerm = (e) => {
		const { target: { value } } = e;
		this.setState({
			searchTerm: value
		});
	};

	searchByTerm = async (searchTerm) => {
		this.setState({ loading: true });
		try {
			const { data: { results: movieResults } } = await moviesApi.search(searchTerm);
			const { data: { results: tvResults } } = await tvApi.search(searchTerm);
			this.setState({
				movieResults,
				tvResults
			});
		} catch (error) {
			this.setState({ error: "Can't find results." });
		} finally {
			this.setState({ loading: false });
		}
	};

	render() {
		const { movieResults, tvResults, searchTerm, loading, error } = this.state;
		return (
			<SearchPresenter
				movieResults={movieResults}
				tvResults={tvResults}
				searchTerm={searchTerm}
				loading={loading}
				error={error}
				handleSubmit={this.handleSubmit}
				updateTerm={this.updateTerm}
			/>
		);
	}
}
