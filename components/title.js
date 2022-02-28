import React from 'react';
import {View, StyleSheet,Text} from 'react-native';

const Title = () => {
    return (
        <View>
            <Text style={styles.titleStyle}>Quiz<Text style={styles.titleExten}>Lig</Text></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    titleStyle:{
        fontSize:25,
        textAlign:'center',
        fontWeight:'bold',
        letterSpacing:1.9,
        marginVertical:50
    },
    titleExten:{
        color:'white',
        
    }
})

export default Title;
