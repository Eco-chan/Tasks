import { Button, FlatList, Modal, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState, useCallback } from 'react';
import  TaskItem  from '@/components/TaskItem';
import AddTask from '@/components/AddTask';
import { AntDesign } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';


//starting a connection with the database
const db = SQLite.openDatabaseSync('Tasks');



export default function TabOneScreen() {
    const [todos, setTodos] = useState([
       {key: 100 , text:'Please enter your tasks through the add button' , date:'', time:''},
    ]);
    const [open, setopen] = useState(false);
    const [date, setDate] = useState({date:'', time:'', total: new Date()});
    const [editTask, setEditTask] = useState('');
    const [openEdit, setOpenEdit] = useState(false);
    const [editTask_Key, setEditTask_Key] = useState(0);
 
 

  

        
        const createTable = async ()=>{const all = (await db).execAsync('create table if not exists Tasks (key integer primary key not null, text text, date text, time text);');}
        const selectAll = async ()=>{ 
          const todoItem = [];
          const allrows =  (await db).getAllSync('SELECT * FROM Tasks');
          console.log('this is allrows' + allrows);
       
          return allrows;
        }
        const dropTable = async ()=>{ const drop = (await db).execAsync('drop table Tasks');}
        
        const selectKeys = async() => { const allkeys = await db.getAllSync('SELECT key FROM Tasks');
          return allkeys;
        }
      
         
      const loadDataCallback = useCallback(async () => {
        try {
          await createTable();
          const storedTodoItem = await selectAll();
          console.log('before setTodos' + storedTodoItem);
          setTodos((prevTodos)=>{
            if (storedTodoItem.length >= 1){
              return storedTodoItem;
            }
            else{
              return prevTodos;
            }
           
            
          })
          console.log('these are the items '+ JSON.stringify(storedTodoItem));
          // dropTable();

        } catch (error) {
          console.error(error);
        }
      }, []);
    
      useEffect(() => {
        loadDataCallback();
      }, [loadDataCallback]);
   
    
    const getKey = (key) => {
      setOpenEdit(true);
      let task = todos.filter(todo => todo.key === key);
      const value = task[0].text;
      setEditTask(value);
      setEditTask_Key(key);
      const date = {date: task[0].date, time: task[0].time, total: new Date()};
      setDate(date);
    }

    const editHandler = async (change)=> {
      if (change.length > 3){
      const update = async() => {await db.runAsync('update Tasks set (text, date, time) = (?,?,?) where key = ?', change, date.date, date.time, editTask_Key);}
      await update();
      const databaseTodos = await selectAll();
      setTodos(databaseTodos);
      setOpenEdit(false);
    }else{
        Alert.alert('Oops!', 'Task must be more than 3 char long', [
          {text:'Understood', onPress: () => console.log('Cancel Pressed')}
        ]);
      }

      
    }
    const pressHandler = (key) => {
       console.log('this is key ' + key);
        const del = async()=> {await db.runAsync('DELETE FROM Tasks WHERE key = $value', { $value: key });} 
        del();

        setTodos((prevTodos) => {
          return prevTodos.filter(task => task.key != key);
        })
    }
   
    const onDataReceived = (data) => {
      setDate(data);
    };

    const get_last_key = async ()=>{
       
      let allkeys = await selectKeys();
      console.log('this is allkeys before '+ JSON.stringify(allkeys));
      console.log(allkeys.length);

      if (allkeys.length <= 0){
        allkeys.push({key: 0});
      }
     
      console.log('these are the keys ' + allkeys);

      let last_key = allkeys[allkeys.length - 1];
     
      console.log(last_key.key);

      return last_key.key;
    }
  

    const addHandler = async (change) => {
        if (change.length > 3){
          const Add = async() => {(await db).runAsync('insert or replace into Tasks (text, date, time) values (?, ?, ?)', change, date.date, date.time);
            console.log('this is from Add');
          }
          Add();

          setDate({date:'', time:'', total: new Date()});
          const last_key = await get_last_key();
          console.log('this is the last key from inside submitHandler ' + last_key);

          setTodos((prevTodos) => {
            console.log(change);
            return [
              {key: last_key + 1 , text: change, date: date.date, time: date.time },
              ...prevTodos
            ];
          })
          setopen(false);
        }else{
          Alert.alert('Oops!', 'Task must be more than 3 char long', [
            {text:'Understood', onPress: () => console.log('Cancel Pressed')}
          ]);
        }
        
    }
    

  return (
    <View style={Styles.container}>
      <View style={Styles.content }>
        <Modal visible={open}
         animationType='slide'
         presentationStyle='overFullScreen'
         onRequestClose={() => {
          setopen(!open);
        }}>
           <AddTask submitHandler={addHandler} onDataReceived={onDataReceived} value=''/>
         
           <TouchableOpacity onPress={() => ( setopen(!open))} style={Styles.plus}>
              <Text> cancel </Text>
          </TouchableOpacity>
         
        </Modal>
        <Modal visible={openEdit}
         animationType='slide'
         onRequestClose={() => {
          setOpenEdit(!openEdit);
        }}>
           <AddTask submitHandler={editHandler} onDataReceived={onDataReceived} value={editTask}/>
         
           <TouchableOpacity onPress={() => ( setOpenEdit(!openEdit))} style={Styles.plus}>
              <Text> cancel </Text>
          </TouchableOpacity>
         
        </Modal>
    
      
        <View style={Styles.list}>
          <FlatList 
            data={todos}
            renderItem={({ item }) => (
              <TaskItem  item={item} pressHandler={pressHandler} getKey={getKey}/>
             
            ) }
          />
        </View>
        <View style={Styles.plusContainer}>
          <TouchableOpacity onPress={() => ( setopen(!open))} style={Styles.plus}>
            <AntDesign name="pluscircleo" size={40} color="black"/>
          </TouchableOpacity>
          </View>
     </View>
  
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:10,
    paddingHorizontal: 20,
  },
  separator: {
    flex: 1,
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  content: {
    flex:1,
    paddingTop: 10,
 },
  list: {
    flex:1,
    marginTop: 10,

  },
  plus: {
    maxWidth: 50,
    marginTop:10,
    marginLeft: 10,
  },
  plusContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
 
});
