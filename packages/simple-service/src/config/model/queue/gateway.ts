import { connectTo } from '../../../model/helper';
import config from '../../config';

export default connectTo({
  modelDir: 'gateway',
  ...config.database.gateway,
});
