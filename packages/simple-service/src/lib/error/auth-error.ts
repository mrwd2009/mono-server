import GatewayError from './gateway-error';

class AuthError extends GatewayError {
  constructor(msg: string) {
    super(msg);
    this.code = 'AuthError';
  }
}

export default AuthError;
