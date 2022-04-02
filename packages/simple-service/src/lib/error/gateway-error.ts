class GatewayError extends Error {
  public code = 'GatewayError';
  // indicate this error can be displayed on UI
  public public = false;
  constructor(msg: string) {
    super(msg);
  }
}

export default GatewayError;
