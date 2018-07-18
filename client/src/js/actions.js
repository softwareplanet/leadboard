import { getDashboard } from './api';

export function loadDashboard() {
	//console.log('!!!');
	//console.log(getDashboard());

	return {
		type: 'PROMISE',
		actions: ['LOADING_STAGES', 'STAGES_LOADED', 'FAILURE_STAGES'],
		promise: getDashboard()
	}
};
