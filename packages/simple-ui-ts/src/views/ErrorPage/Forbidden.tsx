import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { getRouteInfo } from '../../config/routes-info';

const Forbidden: FC = () => {
  return (
    <div className="app-ex-error-page">
      <h1>403</h1>
      <h2>ACCESS NOT GRANTED!</h2>
      <p>
        Sorry, it's not allowed to go beyond this point!&nbsp;
        <Link
          to="/"
          className="route-link"
        >
          Return to homepage
        </Link>
        <span className="p-1">or</span>
        <Link
          to={getRouteInfo('login')!.path}
          className="route-link"
        >
          Log in again
        </Link>
      </p>
    </div>
  );
};

export default memo(Forbidden);
