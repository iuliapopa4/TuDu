import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import LoginScreen from './screens/LoginScreen'
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import InProgress from './screens/InProgress';
import Done from './screens/Done';
const Stack = createNativeStackNavigator();
const Tab=createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
    screenOptions={
      ({route})=>({
        tabBarIcon:({focused,color,size})=>{
          let iconName;
          let rn=route.name;
          if(rn==="Home"){
            iconName=focused? 'home' : 'home-outline';
          }
          else if(rn==="Profile"){
            iconName=focused? 'person' : 'person-outline'; 
          }
          return <Ionicons name={iconName} size={size} color={color}/>
        }
      })
    }
    tabBarOptions={{
      activeTintColor:'#ffbb22',
      inactiveTintColor:'grey',
      labelStyle:{fontSize:10},
    }}
    >  
      <Tab.Screen options={{headerShown:false}} name="Home" component={Home} />
      <Tab.Screen options={{headerShown:false}} name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator screenOptions={{cardStyle:{backgroundColor:'#f9e4d1'}}}>
        <Stack.Screen options={{headerShown:false}} name="Welcome" component={WelcomeScreen} />
        <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown:false}} name="SignUp" component={SignUpScreen} />
        <Stack.Screen options={{headerShown:false}} name="Home" component={Tabs} />
        <Stack.Screen options={{headerShown:false}} name="InProgress" component={InProgress} />
        <Stack.Screen options={{headerShown:false}} name="Done" component={Done} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
