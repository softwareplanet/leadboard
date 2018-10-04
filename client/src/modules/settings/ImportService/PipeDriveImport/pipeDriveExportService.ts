import axios from 'axios';

const pipedriveConnectionProblem = 'Pipedrive refused with: ';

export const exportOrganizations = (token: string) => {
  return axios
    .get(`https://api.pipedrive.com/v1/organizations?start=0&api_token=${token}`)
    .then(result => result.data.data)
    .catch(error => {
      throw new Error(createErrorMessage(error));
    });
};

export const exportContacts = (token: string) => {
  return axios
    .get(`https://api.pipedrive.com/v1/persons?start=0&api_token=${token}`)
    .then(result => result.data.data)
    .catch(error => {
      throw new Error(createErrorMessage(error));
    });
};

export const exportOrganizationFields = (token: string) => {
  return axios
    .get(`https://api.pipedrive.com/v1/organizationFields?start=0&api_token=${token}`)
    .then(result => result.data.data)
    .catch(error => {
      throw new Error(createErrorMessage(error));
    });
};

export const exportContactFields = (token: string) => {
  return axios
    .get(`https://api.pipedrive.com/v1/personFields?start=0&api_token=${token}`)
    .then(result => result.data.data)
    .catch(error => {
      throw new Error(createErrorMessage(error));
    });
};

const createErrorMessage = (error: any) => (
  pipedriveConnectionProblem + '"' + error.response.data.error + '"');
