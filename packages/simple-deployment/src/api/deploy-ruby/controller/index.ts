import { GatewayRouterContext } from '../../../type';
import { validator } from '../../../middleware';

export const showRubyServices = [
  validator(Schema => Schema.object({
    name: Schema.string(),
  })),
  async (context: GatewayRouterContext): Promise<void> => {
    await Promise.resolve();
    context.gateway?.sendJSON?.({
      message: 'hello',
    });
  },
];