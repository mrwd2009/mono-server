import GatewayError from './gateway-error';

class ParamError extends GatewayError {
  constructor(msg: string) {
    super(msg);
    this.code = 'ParamError';
  }
}

export default ParamError;
