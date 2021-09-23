import useContextSearch from '../../../hooks/useContextSearch';
import { getRouter } from '../../../config/router';
const optionDefs = [
  {
    label: 'Name',
    field: 'name',
    fixed: false,
    default: true,
  },
  {
    label: 'IP',
    field: 'ip',
    fixed: false,
  },
  {
    label: 'Status',
    field: 'status',
    fixed: false,
  },
];

const useAgentGlobalSearch = () => {
  const {
    getOptions,
    getValue,
    handleSearch,
  } = useContextSearch(optionDefs);
  return {
    label: 'Server',
    key: 'agent',
    pathname: getRouter('agent').pathname,
    getOptions,
    getValue,
    handleSearch,
  };
};

export default useAgentGlobalSearch;