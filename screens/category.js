import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore'

const Category = ({navigation}) => {
    const [categoryName, setcategoryName] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [catNamearry, setcatNamearry] = useState([]);
    const getCat = async ()=>{
        const datas = await firestore().collection('Category').get();      
        setcategoryName(datas);
        setisLoading(false);
    }
    useEffect(() => {
       getCat();
    }, []);
    // catNamearry.forEach((value, index, array) => {
    //     console.log(value)
    // })
    const getCategoryArry = ()=>{
        const Catarry = [];
        categoryName.forEach((value) => {
            Catarry.push(value['_data']['categoryName'])
        })
        setcatNamearry(Catarry);
    }
    console.log(catNamearry.length)
    return (
        
        <View>
            {
            isLoading==true?(
                <ActivityIndicator size={30} color={'tomato'}/>
            ):catNamearry.length<1?(
                <Button title={'See Category'} onPress={()=> getCategoryArry()}></Button>
            ):null
            }
            {
                catNamearry?.map((category,index)=>(
                    <TouchableOpacity key={index} onPress={()=> navigation.navigate('Quiz',{categoryNameSend:category})} style={styles.categoryiv}>
                        <Text style={styles.categorys}>▶ {category}</Text>
                    </TouchableOpacity>
                ))
                
            }
            
            
        </View>
    );
}

const styles = StyleSheet.create({
    categoryiv:{
        padding:10,
        backgroundColor:'white',
        margin:4
    },
    categorys:{
        fontSize:16,
        padding:2,
        
    }
})

export default Category;
