
import React, { useState } from 'react';
import { Button, Modal, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Text, View } from '@/components/Themed';
import  DateTimePicker  from '@react-native-community/datetimepicker';


export default function AddTime(props){
  

   return (
    <View style={Styles.row}> 
         <TouchableOpacity onPress={() => (props.modeDeterminer('date','calendar'))} style={Styles.modal}>
          <Feather name="calendar" size={24} color="black" />
         </TouchableOpacity>
         <TouchableOpacity  onPress={() => (props.modeDeterminer('time', 'clock'))} style={Styles.modal}>
            <Feather name="clock" size={24} color="black" />
          </TouchableOpacity>
        {props.show && (
        <DateTimePicker 
        testID='dateTimePicker'
        value={props.date}
        mode= {props.mode}
        display= {props.display}
        onChange={props.onchange}/>
      )}
   </View>
   )}

   const Styles = StyleSheet.create({
    modal: {
      maxWidth: 25,
      marginHorizontal:5,
  },
    row: {
      flexDirection: 'row',
      justifyContent:'flex-end',
    }
   })

       