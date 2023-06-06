import {React, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Pressable } from "react-native";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import {db,updateDoc,doc, } from "../firebase"

export default Task = (props) => {
    const [isChecked, setChecked] = useState(props.isChecked);

    async function onCheckmarkPress() {
      setChecked(!isChecked);  
      const ref = doc(db, "tasks", props.id);
        await updateDoc(ref, {
        completed: !isChecked
        }); 
    }

    return (
        <View style={styles.container}>
            <View style={styles.taskContainer}>
                <Pressable
                style={styles.checkbox}
                onPress={onCheckmarkPress}>
                {isChecked && <Ionicons name="checkmark" size={18} color="#ffbb22"/>}
                </Pressable>
                <Text style={{
                    color: 'grey',
                    width: '90%',
                    fontSize: 16,
                    textDecorationLine:isChecked ? 'line-through' : 'none',
                    opacity:isChecked? '.5' : '1'
                    }}
                >{props.text}</Text>
                <TouchableOpacity onPress={() => props.deleteTask()}>
                    <MaterialIcons style={{paddingRight: 10,}} name="delete" size={22} color='#ffbb22' />
                </TouchableOpacity>
            </View>
        </View>

    );
}
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
    task: {
        color: 'grey',
        width: '90%',
        fontSize: 16,
    },
    checkbox: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#ffbb22',
        backgroundColor: 'white',
        marginRight:5,
        marginLeft:-5,
      },

});

