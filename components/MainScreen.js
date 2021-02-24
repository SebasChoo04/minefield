import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import FieldGrid from './FieldGrid';
import randomField from '../functions/RandomField';
import { styles } from '../functions/Styles';
import checkPath from '../functions/PathCheck';
import firebase from '../functions/FirebaseConfig';
import MinesField from './MinesScreen';

export default function MainScreen({ navigation }) {

  const [mines, setMines] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(25);
  const [started, setStarted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [bestTime, setBestTime] = useState(null);
  const [possiblePath, setPossiblePath] = useState(null);
  const [hidden, setHidden] = useState(true);
  const intervalRef = useRef();
  const [bestName, setBestName] = useState('');
  const [bestUnit, setBestUnit] = useState('');

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
      let isThereBomb = JSON.stringify(mines[Math.ceil(currentPosition / 5) - 1][`column${currentPosition % 5}`])
        if (isThereBomb === 'true') {
          setTimeout(() => setCurrentPosition(25), 500)
      }
    }
    if (currentPosition !== 25 && started === false) {
      const stopwatch = setInterval(() => setTimerSeconds((timerSeconds) => timerSeconds + 0.1), 100)
      intervalRef.current = stopwatch
      setStarted(true)
    }
    if (currentPosition === 1) {
      clearInterval(intervalRef.current)
      if (timerSeconds < bestTime || bestTime === null) {
        var newBest = timerSeconds.toFixed(1)
        setBestTime(newBest)
        navigation.navigate("AddNewScore", {time: bestTime})
      }
    }
  }, [currentPosition])
  
  function up() {
    if (Math.ceil(currentPosition / 5) === 1) {
      return
    } else {
      setCurrentPosition(currentPosition - 5)
    }
  }

  function down() {
    if (Math.ceil(currentPosition / 5) === 5) {
      return
    } else {
      setCurrentPosition(currentPosition + 5)
    }
  }

  function left() {
    if (Math.ceil(currentPosition % 5) === 1) {
      return
    } else {
      setCurrentPosition(currentPosition - 1)
    }
  }

  function right() {
    if (Math.ceil(currentPosition % 5) === 0) {
      return
    } else {
      setCurrentPosition(currentPosition + 1)
    }
  }

  async function reset() {
    setMines(randomField())
    var result = await checkPath(mines)
    if (!result) {
      setMines(await randomField())
    }
    setPossiblePath(result)
    setStarted(false)
    setCurrentPosition(25)
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

      <FieldGrid currentPosition={currentPosition} />

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

      <TouchableOpacity onPress={up} style={styles.directionButton}>
        <Text style={styles.controlButtonText}> Up </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={down} style={styles.directionButton}>
        <Text style={styles.controlButtonText}> Down </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={left} style={styles.directionButton}>
        <Text style={styles.controlButtonText}> Left </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={right} style={styles.directionButton}>
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