import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import FieldGrid from './FieldGrid';
import randomField from '../functions/RandomField';
import { styles } from '../functions/Styles';
import checkPath from '../functions/PathCheck';
import firebase from '../functions/FirebaseConfig';
import MinesField from './MinesScreen';
import { useReducer } from 'react';

export default function MainScreen({ navigation }) {

  //Set up
  const [mines, setMines] = useState(null);
  const [started, setStarted] = useState(false);

  const intervalRef = useRef();
  const [timerSeconds, setTimerSeconds] = useState(0);
  
  const [possiblePath, setPossiblePath] = useState(null);
  const [hidden, setHidden] = useState(true);
  
  const [bestName, setBestName] = useState('');
  const [bestTime, setBestTime] = useState(null);
  const [bestUnit, setBestUnit] = useState('');

  const initialPosition = { position: 25 };
  const [position, dispatch] = useReducer(reducer, initialPosition);
 
  function reducer(state, action) {
    switch (action.type) {
      case "UP":
        if (Math.ceil(state / 5) === 1) {
          return state;
        } else {
          alert('up')
          return state - 5;
        }
      case "DOWN":
        if (Math.ceil(state / 5) === 5) {
          return state;
        } else {
          return state + 5;
        }
      case "LEFT":
        if (Math.ceil(state % 5) === 1) {
          return state;
        } else {
          return state - 1;
        }
      case "RIGHT": 
        if (Math.ceil(state % 5) === 0) {
          return state;
        } else {
          return state + 1;
        }
      case 'RESET':
        return 25;
      default:
        return state;
    }
  }

  useEffect(async() => {
    setMines(await randomField())
  }, [])

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('leaderboard').doc('latest').onSnapshot((doc) => {
      const leaderboard = doc.data()
      setBestName(leaderboard['name'])
      setBestUnit(leaderboard['unit'])
      setBestTime(leaderboard['time'])
    }, err => {
      alert(err)
    })

    return () => {
      unsubscribe()
    };
  }, [])

  useEffect(() => {
    (async () => {
      if (mines != null) {
        var result = await checkPath(mines)
        if (!result) {
          setMines(await randomField())
        }
        setPossiblePath(result)
      }
    })()
  }, [mines])

  useEffect(() => {
    if (mines !== null) {
      let isThereBomb = JSON.stringify(mines[Math.ceil(position / 5) - 1][`column${position % 5}`])
        if (isThereBomb === 'true') {
          setTimeout(() => dispatch({ type: "RESET" }), 500)
      }
    }
    if (position !== 25 && started === false) {
      const stopwatch = setInterval(() => setTimerSeconds((timerSeconds) => timerSeconds + 0.1), 100)
      intervalRef.current = stopwatch
      setStarted(true)
    }
    if (position === 1) {
      clearInterval(intervalRef.current)
      if (timerSeconds < bestTime || bestTime === null) {
        var newBest = timerSeconds.toFixed(1)
        setBestTime(newBest)
        navigation.navigate("AddNewScore", { time: bestTime })
      }
    }
  }, [position])

  async function reset() {
    setMines(randomField())
    var result = await checkPath(mines)
    if (!result) {
      setMines(await randomField())
    }
    setPossiblePath(result)
    setStarted(false)
    dispatch({ type: "RESET" })
    setTimerSeconds(0)
  }

  function timer() {
    if (started) {
      setStarted(false)
    } else {
      const stopwatch = setInterval(() => setTimerSeconds((timerSeconds) => timerSeconds + 0.1), 100)
      intervalRef.current = stopwatch
      setStarted(true)
    }
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>

        <Text style={styles.title}> Minefield </Text>

        <TouchableOpacity style={{marginLeft: 20}} onPress={reset}>
          <Image style={styles.refreshImage} source={{uri: "https://cdn0.iconfinder.com/data/icons/essentials-solid/100/Refresh-512.png"}}/>
        </TouchableOpacity>

      </View>

      <FieldGrid currentPosition={position} />

      <Text>
        {possiblePath ? "" : "Warning: There is no possible path, please generate new path"}
      </Text>

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        
        { started ? 
          <Text style={styles.timerText}> Current Time: {timerSeconds.toFixed(1)} seconds </Text> :
          <>
            <TouchableOpacity onPress={timer}>
              <Text style={styles.buttonText}> Start Timer </Text>
            </TouchableOpacity>
          </> 
        }

        <Text style={styles.timerText}> Best Time: {bestTime} seconds by {bestName} from {bestUnit}</Text>

      </View>

      <Text style={styles.title}> Controls </Text>

      <TouchableOpacity onPress={() => dispatch({ type: "UP" })} style={styles.directionButton}>
        <Text style={styles.controlButtonText}> Up </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => dispatch({ type: "DOWN" })} style={styles.directionButton}>
        <Text style={styles.controlButtonText}> Down </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => dispatch({ type: "LEFT" })} style={styles.directionButton}>
        <Text style={styles.controlButtonText}> Left </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => dispatch({ type: "RIGHT" })} style={styles.directionButton}>
        <Text style={styles.controlButtonText}> Right </Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        Answers
      </Text>

      { hidden ? <View/> : <MinesField mines={mines}/> }

      <TouchableOpacity onPress={() => setHidden(!hidden)}>
        <Text style={{marginTop: 10, marginBottom: 20}}> {hidden ? "Show" : "Hide"} </Text>
      </TouchableOpacity>

    </View>
  )
}