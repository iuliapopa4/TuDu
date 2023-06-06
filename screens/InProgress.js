import { StyleSheet, View,FlatList, Text } from 'react-native'
import {React,useState,useEffect} from 'react'
import { auth,db,collection, getDocs, where, query} from '../firebase'

const InProgress = () => {
    const [tasksInProgress,setTasksInProgress]=useState([]);
    const getInProgressTasks = async()=>{
        let tasksInProgress=[];
        const q = query(collection(db, "tasks"), where("userID", "==", auth.currentUser.uid),where("completed","==",false));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          tasksInProgress.push({
            ...doc.data(),
            id:doc.id,
          });
          setTasksInProgress(tasksInProgress);
        });
      };
      useEffect(()=>{
        getInProgressTasks();
      },[]); 


  return (
    <View style={{flex:1}}>
        <View style={{flex:0.3,flexDirection:"row"}}>
            <Text style={{fontSize:40,fontWeight:"bold",alignSelf:"flex-end",paddingLeft:20,paddingBottom:20,color:"#ffbb22"}}>
                In Progress
            </Text>
        </View>

        <FlatList
        data={tasksInProgress}
        renderItem={({item}) =>
        <View style={styles.container}>
            <View style={styles.taskContainer}>
                <Text style={{
                    color: 'grey',
                    width: '90%',
                    fontSize: 16,
                    }}
                >{item.text}</Text>
            </View>
        </View>
        }
        />     
    </View>
  )
}

export default InProgress

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingRight: 25,
        paddingLeft:20,
    
    },
    taskContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 5,
        minHeight: 45,
        marginTop:10,
        
    },
})