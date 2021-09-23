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
    label: 'Category',
    field: 'category',
    fixed: false,
  },
  {
    label: 'Description',
    field: 'description',
    fixed: false,
  },
];

const useServiceGlobalSearch = () => {
  const {
    getOptions,
    getValue,
    handleSearch,
  } = useContextSearch(optionDefs);
  return {
    label: 'Service',
    key: 'service',
    pathname: getRouter('service').pathname,
    getOptions,
    getValue,
    handleSearch,
  };
};

export default useServiceGlobalSearch;