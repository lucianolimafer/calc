import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Entypo } from '@expo/vector-icons';


export default function App() {

  const [ darkMode, setDarkMode ] = useState(false);
  const buttons = ['AC', 'DEL', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 3, 2, 1, '+', 0, '.', '+/-', '=']  

  const [currentNumber, setCurrentNumber] = useState("")
  const [lastNumber, setLastNumber] = useState("")

  function calculator(){
    const splitNumbers = currentNumber.split(' ')
    const firstNumber = parseFloat(splitNumbers[0])
    const lastNumber = parseFloat(splitNumbers[2])
    const operator = splitNumbers[1]

    switch(operator){
      case '+':
        setCurrentNumber((firstNumber + lastNumber).toString())
        return
      case '-':
        setCurrentNumber((firstNumber - lastNumber).toString())
        return
      case '/':
        setCurrentNumber((firstNumber / lastNumber).toString())
        return
      case '*':
        setCurrentNumber((firstNumber * lastNumber).toString())
    }
  }


  function handleInput(buttonPressed){
    console.log(buttonPressed)
    if(buttonPressed === '+' | buttonPressed === '-' | buttonPressed === '*' | buttonPressed === '/'){
      setCurrentNumber(currentNumber + " " + buttonPressed + " ")
      return
    }
    switch(buttonPressed){
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, currentNumber.length -1))
        return
      case 'AC':
        setLastNumber("")
        setCurrentNumber("")
        return
      case '=':
        setLastNumber(currentNumber + " = ")
        calculator()
        return
      case '+/-':
        return
    }
    setCurrentNumber(currentNumber + buttonPressed)
  }


  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? "#282f3b" : "#f5f5f5",
      width: '100%',
      minHeight: '100%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
    },
    historyText: {
      color: darkMode ? "#b5b7bb" : "#7c7c7c",
      fontSize: 15,
      marginRight: 10,
      marginTop: 0,
      alignSelf: 'flex-end',

    },
    resultsText: {
      color: darkMode ? "#F5F5F5" : "#282F38",
      margin: 10,
      fontSize: 40
    },
    themebutton: {
      alignSelf: 'flex-start',
      bottom: 2,
      marginLeft:10,
      marginTop: 10,
      marginBottom: 0,
      backgroundColor: darkMode ? "#7b8084" : "#e5e5e5",
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: 25,
    },
    buttons:{
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      borderColor: darkMode ? "#3f4d5b" : "#e5e5e5",
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 80,
      minHeight: 80,
      flex: 2,
    },
    textButton: {
      color: darkMode ? "#b5b7bb" : "#7c7c7c",
      fontSize: 18,
      fontWeight: 'bold'
    }
  });
  
  return (
    <View>
      <View style={styles.results}>
        
        <TouchableOpacity style={styles.themebutton}>
          <Entypo name={darkMode ? "light-up" : "moon"} size={24} color={darkMode ? "yellow" : "black"} onPress={() => darkMode ? setDarkMode(false) : setDarkMode(true)} />
        </TouchableOpacity>

        <Text style={styles.historyText}>{lastNumber}</Text>

        <Text style={styles.resultsText}>{currentNumber}</Text>
      <View/>

      <View style={styles.buttons}>
        {buttons.map((button) => 
          button === '=' ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: '#9DBC7D'}]} onPress={() => handleInput(button)}>
            <Text style={[styles.textButton, {color: 'white', fontSize: 30}]}>
              {button}
            </Text>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, {backgroundColor: typeof(button) === 'number' ? darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed'}]}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>

        )}
      </View>

      </View>


    </View>
  );
}

