import React, {useState} from 'react';
import Chat from './Chat';
import Login from './Login';
import Users from './Users';

export default function ChatApp() {
  const [currentPage, setCurrentPage] = useState('login');
  const [username, setUsername] = useState(null);
  const [users, setUsers] = useState([]);
  const [userToAdd, setUserToAdd] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const onLogin = async () => {
    try {
      //first check if the user registered before

      //create a new user if not registered

      // set friends list change listener

      setCurrentPage('users');
    } catch (error) {
      console.error(error);
    }
  };
  const onClickUser = user => {
    setCurrentPage('chat');
    setSelectedUser(user);
  };

  const onAddFriend = async name => {
    try {
      //find user and add it to my friends and also add me to his friends
      // don't let user add himself
      // don't let user add a user twice
      // create a chatroom and store the chatroom id
      //join myself to this user friend list
      //add this user to my friend list
    } catch (error) {
      console.error(error);
    }
  };

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
          onAddFriend={onAddFriend}
        />
      );
    case 'chat':
      return <Chat selectedUser={selectedUser} onBack={onBack} />;
    default:
      return null;
  }
}
