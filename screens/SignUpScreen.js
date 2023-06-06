import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
    let [email,setEmail]=useState('')
    let [password,setPassword]=useState('')
    const navigation=useNavigation()

    useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged(user=>{
            if(user){
                navigation.navigate("Home")
            }
        })
        return unsubscribe
        
    },[])

    let handleSignUp=()=>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials)=>{
            const user=userCredentials.user;
            console.log("Registered: ", user.email);
        })
        .catch(error=>alert(error.message))
    }

  return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">
        <View
        style={{width:'80%',}}>
        <Text style={{fontSize:50,marginTop:0,fontWeight:'bold',color:'#ffbb22',}}>Register</Text>
        <Text style={{paddingLeft:10,color:'grey',fontSize:15}}>Create your account</Text>
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
            onPress={handleSignUp}
            style={[styles.button]}>
            <Text style={styles.buttonText}>Sign Up
            </Text>
        </TouchableOpacity>
        <Text style={{color:'grey',fontSize:15}}>or</Text>
        <TouchableOpacity
            onPress={()=>navigation.navigate("Login")}
            style={[styles.button,styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}>Login
            </Text>
        </TouchableOpacity>
        <Text style={{color:'grey',fontSize:14}}>If you already have an account</Text>
        </View>

    </KeyboardAvoidingView>
  )
}

export default SignUpScreen

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
    buttonOutline: {
        backgroundColor:'white',
        marginTop:5,
        borderColor:'#ffbb22',
        borderWidth:2,
    },
    buttonOutlineText: {
        color:'#ffbb22',
        fontWeight:'700',
        fontSize:18,
    },
})