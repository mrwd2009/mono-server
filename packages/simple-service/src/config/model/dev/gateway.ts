import { connectTo } from '../helper';
import config from '../../config';

export default connectTo({
  database: 'modeling_ui_gateway',
  modelDir: 'gateway',
  ...config.database.gateway,
});