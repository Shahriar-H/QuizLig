import React from 'react';
import {useEffect, useState} from 'react';
import { useRoute } from '@react-navigation/native';
import {View, StyleSheet, Text, TouchableOpacity,ActivityIndicator, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore'

const Quiz = ({navigation}) => {
    const route = useRoute();
    const {categoryNameSend} = route.params;    //recieve category name that selected by user
    const [Data, setData] = useState([]);   //data initiali store here
    const [CategorisedQuestion, setCategorisedQuestion] = useState([]); //selected categories question wiill store here
    
    const [QuestionNumber, setQuestionNumber] = useState(-2); //question Serial Number
    const [isLoading, setisLoading] = useState(true); //Check if the all data fached or not
    const [SelectedOption, setSelectedOption] = useState();     //store selecte option
    const [isSelected, setisSelected] = useState(0); //check if any option selected or not
    const [Timercount, setTimercount] = useState(0);    //time start after the quiz start
    const [Score, setScore] = useState(0);  //set one score for per correct answer
    const [IsDisabled, setIsDisabled] = useState(false);    //if answer get selected then disabled the correct answer
    const [prograssBar, setprograssBar] = useState(0);
   
    const getFirestoreData = async ()=>{
        const data = await firestore().collection('quiz').where('category', '==', categoryNameSend).get(); //get data from firestore
        //const d = await data.json();
        setData(data);

        const QuestionInCategory=[];    //set as array all the quesion arraay
        Data.forEach((value, index) => {  //object to array through loop
            
                QuestionInCategory.push(value);
                setCategorisedQuestion(QuestionInCategory);
          
        })
        setQuestionNumber(QuestionNumber+1)
        // setQuestion(CategorisedQuestion[0]['_data']['question'])
        setisSelected(0)
        setisLoading(false)

        

    }
    //console.log(prograssBar);
    useEffect(() => {
        getFirestoreData();
        
    }, []);
  
    //console.log(CategorisedQuestion);
   

    useEffect(() => {
        let Timeris = setTimeout(()=>{
            setTimercount(Timercount+1)
        },1000)
        return () => {
            clearTimeout(Timeris);
        };
    });

    const getQues = ()=>{
        setQuestionNumber(QuestionNumber+1)
        // setQuestion(CategorisedQuestion[0]['_data']['question'])
        setisSelected(0)
        setisLoading(false);
        setprograssBar(prograssBar+10);
        setIsDisabled(false);
    }
   
    const checkAnswer = async(answer)=>{
        //console.log(answer);
        setisSelected(1);
        setSelectedOption(answer);
        if(answer==CategorisedQuestion[QuestionNumber]['_data']['rightAnswer'] && IsDisabled==false){
            setScore(Score+1);
        }
        setIsDisabled(true);
       
           
     }
        


    return (
        
        <View style={styles.quiCon}>

            {
                isLoading==true?(
                    <ActivityIndicator size={30}/>
                ):QuestionNumber<0 ?(
                    <Button title='Start now' onPress={()=> getFirestoreData()}></Button>
                ):(
                    (<View style={styles.qcontainerH}>
                        <View>
                            <Text style={{...styles.quizeHead}}>Score:{Score}</Text>
                            <View style={{
                                backgroundColor:'red',
                                height:4,
                                width: prograssBar+'%',
                            }}></View>
                        </View>
                        <View>
                            <Text style={styles.question}>
                                <Text style={{fontWeight:'bold'}}>Q{QuestionNumber+1}/{CategorisedQuestion.length}. </Text>
                                {CategorisedQuestion[QuestionNumber]['_data']['question']}
                            </Text>
                        </View>
                        <View style={styles.qoptions}>
                            {
                                CategorisedQuestion[QuestionNumber]['_data']['options'].map((option,index)=>(
                                <TouchableOpacity disabled={IsDisabled} key={index}>
        
                                    <Text onPress={()=> checkAnswer(option)} style={styles.optionis}>{option}</Text>
                                   
                                    {
                                        option==CategorisedQuestion[QuestionNumber]['_data']['rightAnswer'] && isSelected==1 ? (
                                            <View>
                                                <Text style={styles.rongAnsStyle}>✅</Text>
                                            </View>
                                        ):option==SelectedOption && isSelected==1 ?(
                                            <View>
                                                <Text style={styles.RightAnsStyle}>❎</Text>
                                            </View>
                                        ):null
                                    }
                                </TouchableOpacity>
                            )) 
                            }
                           
                            {/* <Button title='Next' onPress={()=> getFirestoreData()}></Button> */}
                        </View>
        
                         <View style={styles.actionBtn}>
                            
                            <TouchableOpacity style={styles.nextBtn}>
                                <Text 
                                    onPress={()=> navigation.navigate('Results',{myScore:Score,time:Timercount,question:QuestionNumber})} 
                                    style={styles.disBtn}>
                                    {categoryNameSend} [{Timercount}s]
                                </Text>
                            </TouchableOpacity>
                            {
                            isSelected==1 && QuestionNumber<10 ?(
                                
                            <TouchableOpacity onPress={()=>  getQues()} style={styles.nextBtn}>
                                <Text  style={styles.disBtn}>NEXT</Text>
                                
                            </TouchableOpacity>
                            ):isSelected==1 && QuestionNumber==10 ?(
                                <TouchableOpacity onPress={()=> navigation.navigate('Results',{myScore:Score,time:Timercount,question:qnum})} style={styles.nextBtn}>
                                    <Text  style={{...styles.disBtn, color:'black'}}>FINISH</Text>
                                </TouchableOpacity>
                            ):null
                            }
                        </View> 
                    </View>)
                )
            }
           
        </View>
    );
}

const styles = StyleSheet.create({
    quiCon:{
        height:'100%',
    },
    question:{
        fontSize:21,
        paddingTop:20,
        color:'black',
        fontFamily:'Arial',
        
        padding:5,
    },
    qoptions:{
        marginTop:20,
        flex:1
    },
    optionis:{
        fontSize:20,
        padding:5,
        backgroundColor:'#34a0a4',
        color:'white',
        marginTop:8,
        borderRadius:4,
        paddingHorizontal:20

    },
    quizeHead:{
        backgroundColor:'#168aad',
        textAlign:'center',
        color:'white',
        fontSize:18,
        padding:10
    },
    skipBtn:{
        backgroundColor:'#168aad',
       padding:10,
       borderRadius:4,
   
    },
    nextBtn:{
    
        backgroundColor:'#168aad',
        padding:10,
        borderRadius:4
    },
    actionBtn:{
       marginTop:40,
       flexDirection:'row',
       justifyContent:'space-between'
    
    
    },
    disBtn:{
        color:'white',

    },
    qcontainerH:{
        height:'100%'
    },
    continuBtn:{
        textAlign:'center',
        padding:10,
        backgroundColor:'tomato',
        marginTop:200

    },
    rongAnsStyle:{
        color:'white',
        fontSize:20,
        backgroundColor:'rgba(3, 180, 3, 0.37)',
        position:'absolute',
        width:'100%',
        top:-37,
        padding:4,
        borderRadius:4,
        borderColor:'green',
        borderWidth:2,
        textAlign:'right'
    },
    RightAnsStyle:{
        color:'white',
        fontSize:20,
        backgroundColor:'rgba(180, 3, 3, 0.37)',
        position:'absolute',
        width:'100%',
        top:-37,
        padding:4,
        borderRadius:4,
        borderColor:'red',
        borderWidth:2,
        textAlign:'right'
    },


  
})

export default Quiz;
