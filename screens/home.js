import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity,Image, Button} from 'react-native';
import Title from '../components/title';
import { useNavigation } from '@react-navigation/native';
import { withNavigation } from 'react-navigation';

const Home = ({navigation}) => {
    
    return (
        
        <View>
            
            <Title/>
            <View style={styles.bannerContainer}>
                <Image 
                    source={{uri:'https://cdni.iconscout.com/illustration/premium/thumb/online-survey-4655651-3861431.png'}} 
                    style={styles.banner}
                    resizeMode='contain'
                />
            </View>
            
            <TouchableOpacity onPress={() => navigation.navigate('Category')}>
                <Text style={styles.quizButton} >Start</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    banner:{
        height:350,
        width:350,
    },
    bannerContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    quizButton:{
        textAlign:'center',
        backgroundColor:'black',
        color:'white',
        fontSize:20,
        padding:8,
        marginHorizontal:20,
        borderRadius:4
    }

})

export default Home;
