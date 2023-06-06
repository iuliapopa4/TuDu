import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native'
import React, {useEffect,useState} from 'react'
import { MaterialCommunityIcons, Ionicons, FontAwesome5, Feather, AntDesign } from '@expo/vector-icons'
import { auth,query,collection,db,where,getCountFromServer } from '../firebase'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
  const navigation=useNavigation()

  const handleSignOut=()=>{
    auth.signOut()
      .then(()=>{
      console.log("Logout");
      navigation.replace("Login")
    })  
    .catch(error=>alert(error.message))
  }

  const[total,setTotal]=useState(0);
  const[done,setDone]=useState(0);


  useEffect(() => {
    async function countTotal(){
      const coll = collection(db, "tasks");
      const query_ = query(coll, where('userID', '==', auth.currentUser.uid));
      const snapshot = await getCountFromServer(query_);
      setTotal(snapshot.data().count);
    }
    countTotal();

    async function countDone(){
      const coll = collection(db, "tasks");
      const query_ = query(coll, where('userID', '==', auth.currentUser.uid),where("completed","==",true));
      const snapshot = await getCountFromServer(query_);
      setDone(snapshot.data().count);
    }
    countDone();
  }, []);


  return (
    <View style={{flex: 1,backgroundColor: '#f6f6f6',}}>
      <View style={{flex:0.4,alignItems:'center',justifyContent:'center',backgroundColor:"#f6f6f6",width:'100%',paddingTop:30}}>
        <Image source={require('./images/profile.png')} style={{flex:1,resizeMode:'center'}}/>
      </View> 

      <View style={{flexDirection:'row',paddingLeft:50,paddingBottom:15,alignItems:"center"}}>
        <MaterialCommunityIcons name="email-outline" color="#ffbb22" size={25}/> 
        <Text style={{paddingLeft:10,fontSize:20,color:"grey"}}>{auth.currentUser.email}</Text>
      </View>

      <View style={{flexDirection:'row',paddingLeft:50,paddingBottom:15,alignItems:"center"}}>
        <FontAwesome5 name="medal" color="#ffbb22" size={25}/> 
        <Text style={{paddingLeft:10,fontSize:20,color:"grey"}}>{done}/{total} completed tasks</Text>
      </View>

      <View style={{paddingLeft:50,paddingBottom:15}}>
        <TouchableOpacity 
        onPress={() => navigation.navigate("InProgress")}
        style={{flexDirection:"row", alignItems:"center"}}>
        <Feather name="clock" size={25} color="#ffbb22"/>
        <Text style={{paddingLeft:10,fontSize:20,color:"#ffbb22", fontWeight:"bold"}} >In Progress</Text>
        </TouchableOpacity>
      </View>

      <View style={{paddingLeft:50,paddingBottom:15}}>
        <TouchableOpacity 
        onPress={() => navigation.navigate("Done")}
        style={{flexDirection:"row", alignItems:"center"}}>
        <AntDesign name="checkcircleo" size={25} color="#3ab54a"/>
        <Text style={{paddingLeft:10,fontSize:20,color:"#3ab54a", fontWeight:"bold"}} >Completed</Text>
        </TouchableOpacity>
      </View>

      <View style={{paddingLeft:50,paddingBottom:15}}>
        <TouchableOpacity 
        onPress={handleSignOut}
        style={{flexDirection:"row", alignItems:"center"}}>
        <Ionicons name="power" size={25} color="#e10000"/>
        <Text style={{paddingLeft:10,fontSize:20,color:"#c70000", fontWeight:"bold"}} >Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProfileScreen

