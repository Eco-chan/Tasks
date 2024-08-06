import React, { useState } from 'react';
import { Button, Modal, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { MaterialIcons } from '@expo/vector-icons';
import AddTime from './AddTime';


export default function AddTask(props){
    const [change , setChange] = useState('');
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('time');
    const [display, setDisplay] = useState('clock');


    const changeHandler = (val) => (
         setChange(val)
    )
    
    const onchange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(false);
      setDate(currentDate); 
      console.log("This is currentDate" + currentDate);

      let tempDate = new Date(currentDate);
      let month = tempDate.getMonth() + 1;
      let fDate = tempDate.getDate() + '/' + month + '/' + tempDate.getFullYear();
      let fTime = tempDate.getHours()+ " : " + tempDate.getMinutes();

      console.log("this is tempDate" + tempDate);
      let dateTotal = {date: fDate, time: fTime , total: tempDate};

      props.onDataReceived(dateTotal);

      }

    const modeDeterminer = (mode, display)=>{
        setShow(true);
        setMode(mode);
        setDisplay(display);
    }
    
    return(
        <View style={styles.container}>
          <TextInput 
          multiline
          placeholder='Type in your task here!'
          defaultValue= {props.value}
          onChangeText={changeHandler}
          style={styles.input}
          />
          <View style={styles.date}> 
          <AddTime show={show} date={date} onchange={onchange} modeDeterminer={modeDeterminer} mode={mode} display={display}/>
          </View>
          <Button onPress={() => (props.submitHandler(change))} title='Add'/>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        padding:10,
    },
    input:{
        padding:10,
        marginVertical:90,
        borderBottomColor: 'lightblue',
        marginBottom: 10,
        borderBottomWidth: 1,
    },
    date: {
        marginBottom:5,
    },
    modal: {
        maxWidth: 25,
    }

})