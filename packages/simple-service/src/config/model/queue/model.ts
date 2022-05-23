import { connectTo } from '../../../model/helper';
import config from '../../config';

export default connectTo({
  ...config.database.model,
});
