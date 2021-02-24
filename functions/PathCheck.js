function convertToArray(mineFieldJSON){
  var arr = []
  var i
  for (i in mineFieldJSON) {
    // console.log("Hi:", mineField[i])
    arr.push([mineFieldJSON[i].column1, mineFieldJSON[i].column2, mineFieldJSON[i].column3, mineFieldJSON[i].column4, mineFieldJSON[i].column0])
  }
  return arr
}

export default async function checkPath(mines) {

  var mineFieldArray = convertToArray(mines)

  console.table(mineFieldArray)

  var testColumn = 4
  var testRow = 4
  var isTherePath = false

   try {
    while (!isTherePath) {
      // console.log(testColumn)
      var isThereBomb = mineFieldArray[testRow][testColumn - 1]
      if (isThereBomb && testRow != 0) {
        //There is bomb and not top row
        testColumn += 1
        testRow -= 1
        console.log("Bomb found not in top row")
      } else if (!isThereBomb && testColumn - 1 != 0) {
        testColumn -= 1
        console.log("No bomb found in current row")
      } else if (!isThereBomb && testRow != 0 && testColumn - 1 == 0){
        testRow -= 1
        console.log("Bomb in first column")
      } else if (isThereBomb && testColumn - 1 == 0) {
        testColumn += 1
        testRow -= 1
        console.log("Bomb in top row")
      } else if (testColumn - 1 == 0 && testRow == 0) {
        isTherePath = true
        console.log("There is a path / True")
      } else {
        console.log("No Path")
        isTherePath = false
        break
      }
    }
    // alert(isTherePath)
    return isTherePath
  } catch(error) {
     console.log(error)
     alert(error)
  }
  // console.log(isTherePath)
}