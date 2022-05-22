import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../providers/auth_provider';

const DayWords = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  return (
    <div>
      <button
        onClick={() => {
          auth?.logout();
          history.push('/');
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default DayWords;
