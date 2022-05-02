import GatewayError from './gateway-error';

class ForbiddenError extends GatewayError {
  constructor(msg: string) {
    super(msg);
    this.code = 'ForbiddenError';
  }
}

export default ForbiddenError;
