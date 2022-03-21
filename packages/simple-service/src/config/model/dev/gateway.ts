import { connectTo } from '../../../model/helper';
import config from '../../config';

export default connectTo({
  database: 'app_gateway',
  modelDir: 'gateway',
  ...config.database.gateway,
});
