import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {React, useState} from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    let [email,setEmail]=useState('')
    let [password,setPassword]=useState('')
    const navigation=useNavigation()

    if(auth.currentUser){
        navigation.navigate('Home');
    } else {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              navigation.navigate('Home');
            } 
          });
    }
    
    let handleLogin=()=>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials)=>{
            const user=userCredentials.user;
            console.log("Login: ", user.email);
        })
        .catch(error=>alert(error.message))
    }

  return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">
        <View
        style={{width:'80%',}}>
        <Text style={{fontSize:50,marginTop:0,fontWeight:'bold',color:'#ffbb22',}}>Login</Text> 
        <TextInput
        placeholder='Email'
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        />

    	<TextInput
        placeholder='Password'
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        secureTextEntry
        />

        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}>
                <Text style={styles.buttonText}>Login
                </Text>
            </TouchableOpacity>
            <Text style={{marginTop:10,fontSize:15,color:'grey'}}>Don't have an account?</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("SignUp")}
            >
                <Text style={{color:'#728c99',fontSize:15}}>Sign Up</Text>
            </TouchableOpacity>
        </View>

    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f6f6f6',
    },
    input: {
        backgroundColor:'#ececec',
        paddingHorizontal:25,
        paddingVertical:22,
        borderRadius:10,
        marginTop:15,
    },
    buttonContainer: {
        width:'60%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:40,
    },
    button: {
        backgroundColor:'#ffbb22',
        width:'100%',
        padding:15,
        borderRadius:10,
        alignItems:'center',
    },
    buttonText:{
        color:'white',
        fontWeight:'700',
        fontSize:18,
    },

})