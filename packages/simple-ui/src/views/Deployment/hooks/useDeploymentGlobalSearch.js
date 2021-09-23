import useContextSearch from '../../../hooks/useContextSearch';
import { getRouter } from '../../../config/router';
const optionDefs = [
  {
    label: 'Status',
    field: 'status',
    fixed: false,
    default: true,
  },
  {
    label: 'Agent ID',
    field: 'agent_id',
    fixed: false,
  },
  {
    label: 'Service ID',
    field: 'service_id',
    fixed: false,
  },
];

const useDeploymentGlobalSearch = () => {
  const {
    getOptions,
    getValue,
    handleSearch,
  } = useContextSearch(optionDefs);
  return {
    label: 'Deployment',
    key: 'deployment',
    pathname: getRouter('deployment').pathname,
    getOptions,
    getValue,
    handleSearch,
  };
};

export default useDeploymentGlobalSearch;