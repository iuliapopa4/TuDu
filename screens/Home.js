import { StyleSheet, View,FlatList, Keyboard, Image, } from 'react-native'
import React, {useEffect, useState} from 'react'
import { auth,db,collection, getDocs, addDoc, where, deleteDoc, doc,query} from '../firebase'
import Task from '../components/Task'
import TaskInput from '../components/TaskInput'

const Home = () => {
  let [tasks,setTasks]=useState([]);

  let addTask = async(task) => {
    if (task == null) return;
    Keyboard.dismiss();
    await addDoc(collection(db, "tasks"), {
      text:task,  
      completed:false,
      userID:auth.currentUser.uid
    });
    getTasks();    
  };

  const getTasks = async()=>{
    let tasks=[];
    const q = query(collection(db, "tasks"), where("userID", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      tasks.push({
        ...doc.data(),
        id:doc.id,
      });
      setTasks(tasks.sort((a,b) => (a.completed > b.completed ? true : false)));
    });
  };

  useEffect(()=>{
    getTasks();
  },[]);  

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    getTasks();
  }

  return (
    <View style={styles.container}>
      <View
      style={{flex:0.6,alignItems:'center',justifyContent:'center',backgroundColor:"#f5b730",width:'100%'}}>
        <Image source={require('./images/header.png')} style={{flex:1,resizeMode:'contain'}}/>
      </View>    

      <FlatList
      style={{flex:1}}
      data={tasks}
      renderItem={({item})=>
        <Task 
        text={item.text}
        deleteTask={() => deleteTask(item.id)}
        id={item.id}
        isChecked={item.completed}
        />
      }
      keyExtractor={(item) => item.id}
      />
    
      <TaskInput addTask={addTask}/>
    </View>  
  );
};

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
button: {
    backgroundColor:'#ffc30b',
    width:'60%',
    padding:15,
    borderRadius:10,
    alignItems:'center',
    marginTop:40,
},
buttonText:{
    color:'white',
    fontWeight:'700',
    fontSize:16,
},
});

