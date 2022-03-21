/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';
import pick from 'lodash/pick';
import GatewayError from './gateway-error';

class BackendError extends GatewayError {
  public publicMessage?: string;
  public httpConfig: any;
  public httpResponse: any;

  constructor(error: AxiosError) {
    super(error.message);
    if (error.config) {
      this.httpConfig = pick(error.config, ['url', 'method', 'headers', 'params', 'data', 'timeout']);
    }
    if (error.response) {
      this.httpResponse = pick(error.response, ['data', 'status', 'statusText', 'headers']);
    }
    if (error.response?.data?.meta) {
      const {
        data: {
          meta: { message, publicMessage },
        },
      } = error.response;
      // message field maybe empty
      this.message = message || publicMessage;
      this.publicMessage = publicMessage;
    }
    this.code = 'BackendError';
  }
}

export default BackendError;
