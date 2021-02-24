import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  view: {
    flexDirection: 'row'
  },
  directionButton: {
    backgroundColor: 'blue',
    width: 200,
    height: 50,
    borderRadius: 20,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  button: {
    backgroundColor: 'blue',
    width: 200,
    height: 50,
    borderRadius: 20,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  controlButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40, 
    marginTop: 10,
  },
  container: {
    alignItems: 'center'
  }, 
  refreshImage: {
    height: 30, 
    width: 30, 
    marginTop: 20
  }, 
  timerText: {
    fontSize: 20
  }
})