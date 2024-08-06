import { StyleSheet, Text } from 'react-native';
import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { View } from '@/components/Themed';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabaseSync('Tasks');

export default function TabTwoScreen() {


  const [selected, setSelected] = useState('');
  
    
  return (
    <View style={styles.container}>
    <Calendar
      style={styles.separator}
      onDayPress={(day: { dateString: React.SetStateAction<string>; }) => {
        setSelected(day.dateString);
      }}
      markedDates={{
       [selected]: {selected: true, marked: true, selectedColor: 'blue'}
      }}
    />
    
    <Text style={styles.text}>This calendar is under construction, this is just a view</Text>
   
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
  },
  text: {
    fontWeight: 'bold',
    marginVertical:10,
    color: 'red',
  }
});
