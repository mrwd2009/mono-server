import contractApi from './service';
import apiEndpoints from '../../../config/api-endpoints';

const contractDemoApi = contractApi.injectEndpoints({
  endpoints: (build) => ({
    getContractList: build.query<any, void>({
      query: () => ({
        url: apiEndpoints.contract.list,
      }),
    }),
  })
});

export const { useGetContractListQuery, useLazyGetContractListQuery } = contractDemoApi;

// // use lazy loading
// const [trigger, result] = useLazyGetContractListQuery();

// use eager loading
// result
// {
//   isError: false
//   isFetching: true
//   isLoading: true
//   isSuccess: false
//   data,
//   ...
// }
// const result = useGetContractListQuery();

export default contractDemoApi;