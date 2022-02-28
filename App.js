import React from 'react';
import {View, Text, StyleSheet,ScrollView} from 'react-native';
//import MyStack from './navigation';
import Home from './screens/home';
import Quiz from './screens/quiz';
import Result from './screens/result';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Category from './screens/category';

const App=({navigation})=>{
    return(

        <View style={styles.container}>
            
            <Home navigation={navigation}/>
            {/* <Result/> */}
            {/* <Quiz/> */}
        </View>
    )
}

function ResultScreen({navigation}) {
    return (
      <View style={{ margin:20 }}>
        <Result navigation={navigation}/>
      </View>
    );
}
function QuizScreen({navigation}) {
    return (
      <View style={{ margin:20 }}>
        <Quiz navigation={navigation}/>
      </View>
    );
}
function CategoryScreen({navigation}){
  return(
    <ScrollView style={{ margin:20 }}>
      <Category navigation={navigation}/>
    </ScrollView>
  )
}
const Stack = createNativeStackNavigator();

function App1() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={App} options={{headerShown:false}} />
          <Stack.Screen name="Results" component={ResultScreen} options={{headerShown:false}} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="Category" component={CategoryScreen}/>

        </Stack.Navigator>
      </NavigationContainer>
    );
  }


export default App1;
const styles=StyleSheet.create({
    container:{
        height:'100%',
        backgroundColor:'tomato'
    }
})