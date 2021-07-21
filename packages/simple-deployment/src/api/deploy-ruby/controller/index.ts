import { GatewayRouterContext } from '../../../type';
import { validator } from '../../../middleware';
import axios from 'axios';

export const showRubyServices = [
  validator(Schema => Schema.object({
    name: Schema.string(),
  })),
  async (context: GatewayRouterContext): Promise<void> => {
    await Promise.resolve();
    await axios.get('http://akka-billing-utilitya.internal.gridx.com:8127/batch')
    context.gateway?.sendJSON?.({
      message: 'hello',
    });
  },
];