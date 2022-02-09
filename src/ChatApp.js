import React, {useEffect, useState} from 'react';
import Chat from './Chat';
import Login from './Login';
import Users from './Users';
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

const defaultUsers = [
  {id: 1, name: 'Alex', avatar: 'https://placeimg.com/140/140/any'},
  {id: 2, name: 'Sara', avatar: 'https://placeimg.com/140/140/any'},
  {id: 3, name: 'Michael', avatar: 'https://placeimg.com/140/140/any'},
];

export default function ChatApp() {
  const [currentPage, setCurrentPage] = useState('login');
  const [username, setUsername] = useState(null);
  const [users, setUsers] = useState(defaultUsers);
  const [userToAdd, setUserToAdd] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    console.log('iddd');

    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        console.log('id', user);

        setCurrentPage('users');

        // ...
      } else {
        // User is signed out.
        setCurrentPage('login');
      }
    });
  }, []);

  const onLogin = () => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: username,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  const onClickUser = user => {
    setCurrentPage('chat');
    setSelectedUser(user);
  };
  const onAddUser = () => {};

  const onBack = () => {
    setCurrentPage('users');
  };

  switch (currentPage) {
    case 'login':
      return (
        <Login
          onLogin={onLogin}
          username={username}
          setUsername={setUsername}
        />
      );
    case 'users':
      return (
        <Users
          users={users}
          onClickUser={onClickUser}
          userToAdd={userToAdd}
          setUserToAdd={setUserToAdd}
          onAddUser={onAddUser}
        />
      );
    case 'chat':
      return <Chat selectedUser={selectedUser} onBack={onBack} />;
    default:
      return null;
  }
}
