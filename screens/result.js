import React from 'react';
import {View, StyleSheet, Text, Image, Button} from 'react-native';
import { useRoute } from '@react-navigation/native';

const Result = ({navigation}) => {
    const route = useRoute();
    const {myScore, time,question}= route.params;
    return (
        <View>
            <Text style={styles.resultHead}>Your Result</Text>
            <View style={styles.resultDiv}>
                <View style={styles.QDetail}>
                    <Text style={{color:'white', fontSize:18}}>Answered: <Text>{JSON.stringify(question)}</Text></Text>
                    <Text style={{color:'white',fontSize:18}}>Time: <Text>{JSON.stringify(time)}s</Text></Text>
                </View>
                <View>
                    <Text  style={{...styles.resultShow,color:'white', fontSize:29}}>Your Result</Text>
                    <Text  style={{...styles.resultShow,color:'white', fontSize:49}}>{JSON.stringify(myScore)}</Text>
                    <Text style={{color:'white', fontSize:15, textAlign:'center'}}>Out Of 10</Text>
                </View>
                <View style={{marginTop:20}}>
                <Button
                    title="Back Home"
                    onPress={() => navigation.navigate('Home')}
                />
                    <Image source={{uri: 'https://st2.depositphotos.com/1001911/11581/v/600/depositphotos_115814126-stock-illustration-thumbs-up-emoticon.jpg'}}/>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    resultHead:{
        backgroundColor:'#168aad',
        textAlign:'center',
        color:'white',
        fontSize:18,
        padding:10,
        marginTop:70
    },
    resultDiv:{
        backgroundColor:'#184e77',
        borderRadius:4,
        height:400,
        marginTop:20,
        color:'white',
        paddingHorizontal:20,
        paddingTop:20
    },
    QDetail:{
        flexDirection:'row',
        justifyContent:'space-between',
        color:'white'
    },
    resultShow:{
        textAlign:'center',
        marginTop:30
    }

})

export default Result;
