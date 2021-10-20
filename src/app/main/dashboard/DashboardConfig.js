import { Redirect } from 'react-router-dom';
import Photos from './photos/Photos';

const DashboardConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/photos/:category',
			component: Photos
		},
		{
			path: '/photos',
			component: () => <Redirect to="/photos/nature" />
		},
	]
};

export default DashboardConfig;
