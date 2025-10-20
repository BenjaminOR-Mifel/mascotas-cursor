import ApiRepository from './ApiRepository';
import ModyoProfileRepository from './ModyoProfileRepository';

const repositories = {
  api: ApiRepository,
  profile: ModyoProfileRepository,
};
export default {
  get: (name) => repositories[name],
};
