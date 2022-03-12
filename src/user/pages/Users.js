import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
const axios = require("axios");

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log(localStorage.getItem("portfolio-builder"));
        const responseData = await axios.get(
          'https://portfolio-builder-backend.herokuapp.com/user/profile',
          {
            headers:{
              'Content-Type': 'application/json',
              "portfolio-builder":localStorage.getItem("portfolio-builder")
            }
          }
        );
          console.log(responseData.data.data);
        setLoadedUsers(responseData.data.data);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
