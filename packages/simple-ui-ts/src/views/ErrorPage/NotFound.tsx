import { FC, memo } from 'react';
import { Link } from 'react-router-dom'

const NotFound: FC = () => {
  return (
    <div className="app-ex-error-page">
      <h1>404</h1>
      <h2>OOPS! NOTHING WAS FOUND</h2>
      <p>
        The page you are looking for might have been removed, had its name changed or is temporarily unavailable.
        &nbsp;<Link to="/" className="route-link">Return to homepage</Link>
      </p>
    </div>
  )
};

export default memo(NotFound);