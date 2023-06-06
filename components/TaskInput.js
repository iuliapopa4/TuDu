import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, View, TextInput, TouchableOpacity, } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 

export default TaskInput = (props) => {
    const [task, setTask] = useState();
    const handleAddTask = (value) => {
        props.addTask(value);
        setTask(null);
    }

    return (
        <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TextInput style={styles.inputField} value={task} onChangeText={text => setTask(text)} placeholder={'New task...'} placeholderTextColor={'#d6d6d6'}/>
        <TouchableOpacity onPress={() => handleAddTask(task)}>
          <View style={styles.button}>
              <AntDesign name="plus" size={30} color="white" />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#ffbb22',
        backgroundColor: 'white',
        borderWidth: 0,
        marginHorizontal: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        bottom: 20,
    },
    inputField: {
        color: '#728c99',
        height: 50,
        flex: 1,
        fontSize:16,
    },
    button: {
        height: 30,
        width: 30,
        borderRadius: 5,
        backgroundColor: '#ffbb22',
        alignItems: 'center',
        justifyContent: 'center'
    },
});