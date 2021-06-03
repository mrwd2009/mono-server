import GatewayError from './gateway-error';

class BackendError extends GatewayError {
  constructor(msg: string) {
    super(msg);
    this.code = 'BackendError';
  }
}

export default BackendError;