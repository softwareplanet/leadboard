import { getStages } from './api';

export function loadStages(funnel) {
	return {
		type: 'PROMISE',
		actions: ['LOADING_STAGES', 'STAGES_LOADED', 'FAILURE_STAGES'],
		promise: getStages(funnel)
	}
};
