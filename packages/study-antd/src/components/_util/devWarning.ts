import devWarning, { resetWarned } from '../../dependents/util/src/warning';

export { resetWarned };

const warning = (valid: boolean, component: string, message: string): void => {
  devWarning(valid, `[antd: ${component}] ${message}`);
};

export default warning;