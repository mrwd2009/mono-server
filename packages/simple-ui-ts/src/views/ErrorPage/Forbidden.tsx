import { FC, memo } from 'react';
import { Link } from 'react-router-dom'

const Forbidden: FC = () => {
  return (
    <div className="app-ex-error-page">
      <h1>403</h1>
      <h2>ACCESS NOT GRANTED!</h2>
      <p>
        Sorry, it's not allowed to go beyond this point!&nbsp;
        <Link to="/" className="route-link">Return to homepage</Link>
      </p>
    </div>
  )
};

export default memo(Forbidden);