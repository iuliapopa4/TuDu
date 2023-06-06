import { StyleSheet, Text, View, Image , TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
const WelcomeScreen = () => {
  const navigation=useNavigation()
  return (
    <View
    style={{flex:1,alignItems:'center',justifyContent: 'center', backgroundColor:'#f6f6f6'}}>
      <Image source={require('./images/welcome.png')} style={{flex:1,padding:100,resizeMode:'contain',marginTop:100}} />
      <Text style={{fontSize:70,marginTop:0,fontWeight:'bold',color:'#ffbb22'}}>Welcome!</Text> 
      <Text style={{fontSize:20,marginTop:0,color:'grey',marginBottom:50}}>Organize your life with TuDu</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{
          backgroundColor:'#ffbb22',
          padding:18,
          width:'55%',
          borderRadius:10,
          alignItems:'center',
          marginBottom:100,
          marginTop:0}}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  buttonText:{
    color:'white',
    fontWeight:'700',
    fontSize:17,
  },
})