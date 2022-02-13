import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {Image, Pressable, StyleSheet, Text} from 'react-native';
import {getDatabase, ref, get, update, onValue, off} from 'firebase/database';

export default function Chat({onBack, myData, selectedUser}) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const chatroom = await fetchMessages();
      const renderedMessages = renderMessages(chatroom.messages);
      setMessages(renderedMessages);
    };
    loadData();

    const database = getDatabase();

    // set chatroom change listener
    const chatroomRef = ref(database, `chatrooms/${selectedUser.chatroomId}`);
    onValue(chatroomRef, snapshot => {
      const data = snapshot.val();
      setMessages(renderMessages(data.messages));
    });
    return () => {
      off(chatroomRef);
    };
  }, [
    fetchMessages,
    myData.avatar,
    myData.username,
    renderMessages,
    selectedUser.avatar,
    selectedUser.chatroomId,
    selectedUser.username,
  ]);

  const renderMessages = useCallback(
    msgs => {
      return msgs
        ? msgs.reverse().map((m, index) => ({
            ...m,
            _id: index,
            user: {
              avatar:
                m.sender === myData.username
                  ? myData.avatar
                  : selectedUser.avatar,
              name:
                m.sender === myData.username
                  ? myData.username
                  : selectedUser.username,
              _id:
                m.sender === myData.username
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
      const database = getDatabase();

      const currentChatroom = await fetchMessages();
      const lastMessages = currentChatroom.messages || [];

      update(ref(database, 'chatrooms/' + selectedUser.chatroomId), {
        messages: [
          ...lastMessages,
          {
            text: msg[0].text,
            sender: myData.username,
            createdAt: new Date(),
          },
        ],
      });
      setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
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
