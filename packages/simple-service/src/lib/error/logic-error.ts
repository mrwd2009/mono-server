import GatewayError from './gateway-error';

class LogicError extends GatewayError {
  constructor(msg: string) {
    super(msg);
    this.code = 'LogicError';
  }
}

export default LogicError;
