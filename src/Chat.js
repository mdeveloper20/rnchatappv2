import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {Image, Pressable, StyleSheet, Text} from 'react-native';
import {getDatabase, get, ref, onValue, off, update} from 'firebase/database';

export default function Chat({onBack, myData, selectedUser}) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    //load old messages
    const loadData = async () => {
      const myChatroom = await fetchMessages();

      setMessages(renderMessages(myChatroom.messages));
    };

    loadData();

    // set chatroom change listener
    const database = getDatabase();
    const chatroomRef = ref(database, `chatrooms/${selectedUser.chatroomId}`);
    onValue(chatroomRef, snapshot => {
      const data = snapshot.val();
      setMessages(renderMessages(data.messages));
    });

    return () => {
      //remove chatroom listener
      off(chatroomRef);
    };
  }, [fetchMessages, renderMessages, selectedUser.chatroomId]);

  const renderMessages = useCallback(
    msgs => {
      //structure for chat library:
      // msg = {
      //   _id: '',
      //   user: {
      //     avatar:'',
      //     name: '',
      //     _id: ''
      //   }
      // }

      return msgs
        ? msgs.reverse().map((msg, index) => ({
            ...msg,
            _id: index,
            user: {
              _id:
                msg.sender === myData.username
                  ? myData.username
                  : selectedUser.username,
              avatar:
                msg.sender === myData.username
                  ? myData.avatar
                  : selectedUser.avatar,
              name:
                msg.sender === myData.username
                  ? myData.username
                  : selectedUser.username,
            },
          }))
        : [];
    },
    [
      myData.avatar,
      myData.username,
      selectedUser.avatar,
      selectedUser.username,
    ],
  );

  const fetchMessages = useCallback(async () => {
    const database = getDatabase();

    const snapshot = await get(
      ref(database, `chatrooms/${selectedUser.chatroomId}`),
    );

    return snapshot.val();
  }, [selectedUser.chatroomId]);

  const onSend = useCallback(
    async (msg = []) => {
      //send the msg[0] to the other user
      const database = getDatabase();

      //fetch fresh messages from server
      const currentChatroom = await fetchMessages();

      const lastMessages = currentChatroom.messages || [];

      update(ref(database, `chatrooms/${selectedUser.chatroomId}`), {
        messages: [
          ...lastMessages,
          {
            text: msg[0].text,
            sender: myData.username,
            createdAt: new Date(),
          },
        ],
      });

      setMessages(prevMessages => GiftedChat.append(prevMessages, msg));
    },
    [fetchMessages, myData.username, selectedUser.chatroomId],
  );

  return (
    <>
      <Pressable onPress={onBack} style={styles.actionBar}>
        <Image source={require('./assets/back.png')} />
        <Text>{selectedUser?.name}</Text>
      </Pressable>
      <GiftedChat
        messages={messages}
        onSend={newMessage => onSend(newMessage)}
        user={{
          _id: myData.username,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  actionBar: {
    backgroundColor: '#cacaca',
    height: 41,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
