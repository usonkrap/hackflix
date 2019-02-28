import React from 'react';
import HomePresenter from './HomePresenter';

export default class extends React.Component {
	state = {
		nowPlaying: null,
		popular: null,
		upcoming: null,
		error: null,
		loading: true
	};

	render() {
		const { nowPlaying, popular, upcoming, error, loading } = this.state;
		return (
			<HomePresenter
				nowPlaying={nowPlaying}
				popular={popular}
				upcoming={upcoming}
				error={error}
				loading={loading}
			/>
		);
	}
}
