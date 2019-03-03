import React from 'react';
import DetailPresenter from './DetailPresenter';
import { moviesApi, tvApi } from 'api';

export default class extends React.Component {
	constructor(props) {
		super(props);
		const { location: { pathname } } = props;
		this.state = {
			result: null,
			error: null,
			loading: true,
			isMovie: pathname.includes('/movie/')
		};
	}

	async componentDidMount() {
		const { match: { params: { id } }, history: { push } } = this.props;
		const { isMovie } = this.state;
		if (isNaN(id)) {
			return push('/');
		}
		try {
			const { data: result } = isMovie ? await moviesApi.movieDetail(id) : await tvApi.showDetail(id);
			this.setState({
				result
			});
		} catch (error) {
			this.setState({
				result: null,
				error: "Can't find anything."
			});
		} finally {
			this.setState({
				loading: false
			});
		}
	}

	render() {
		const { result, error, loading } = this.state;
		return <DetailPresenter result={result} error={error} loading={loading} />;
	}
}
