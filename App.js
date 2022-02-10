import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState({});

  function missingData(){
    return "missing";
  }

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    setHasPermission(status === 'granted');

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })

      setContacts(data);
    }
  }

  return (

    <View style={styles.container} >
      <Button title="Show Contacts" onPress={getContacts}/>
      <FlatList
      kayExtratctor={(item,index) => index.toString()}
      renderItem={({item}) =>
        <View>
          <Text>{item.firstName} {item.lastName}  {item.phoneNumbers[0].number}</Text>
        </View>}
        data={contacts}
        ListEmptyComponent = {()=> <Text></Text>}  
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:40,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});