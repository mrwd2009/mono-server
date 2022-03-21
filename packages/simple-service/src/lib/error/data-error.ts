import GatewayError from './gateway-error';

class DataError extends GatewayError {
  constructor(msg: string) {
    super(msg);
    this.code = 'DataError';
  }
}

export default DataError;
