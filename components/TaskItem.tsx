import React from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import { Text, View } from '@/components/Themed';
import { AntDesign } from '@expo/vector-icons';

export default function TaskItem({item, pressHandler, getKey}) {
     return (
          
          <View style={styles.item}>
          <Text>{item.text} </Text>
          <View style={styles.view}>
          <View style={styles.date}>
          <Text>{item.time}</Text>
          <Text>{item.date}</Text>
          </View>
          
          <View style={styles.delete}>
          <TouchableOpacity onPress={() => getKey(item.key)} style={styles.btn}>
          <AntDesign name="edit" size={20} color="black" />
          </TouchableOpacity>
          </View>
          <View style={styles.delete}>
          <TouchableOpacity onPress={() => pressHandler(item.key)} style={styles.btn}>
          <AntDesign name="delete" size={20} color="black" />
          </TouchableOpacity>
          </View>
          </View>
          </View>

          
          
     )
}

const styles = StyleSheet.create({
    item: {
        flex:2,
        padding: 16,
        marginTop: 16,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#bbb',
    },
    date: {
        flex:1,
        marginTop: 40,
    },
    btn: {
        width: 39,
    },
    delete: {
        marginTop: 50,
        alignItems: 'flex-end',
    },
    view:{
        flexDirection: 'row',
    }
    
})
