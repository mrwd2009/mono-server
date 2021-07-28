class GatewayError extends Error {
  public code = 'GatewayError';
  constructor(msg: string) {
    super(msg);
  }
}

export default GatewayError;