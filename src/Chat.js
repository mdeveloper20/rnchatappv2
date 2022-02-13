import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {Image, Pressable, StyleSheet, Text} from 'react-native';

export default function Chat({onBack, myData, selectedUser}) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    //load old messages

    // set chatroom change listener

    return () => {
      //remove chatroom listener
    };
  }, []);

  //structure for chat library:
  // msg = {
  //   _id: '',
  //   user: {
  //     avatar:'',
  //     name: '',
  //     _id: ''
  //   }
  // }

  const onSend = useCallback(async (msg = []) => {
    //send the msg[0] to the other user
    //fetch fresh messages from server
  }, []);

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
          _id: 1,
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
