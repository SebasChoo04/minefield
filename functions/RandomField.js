function randomMine() {
  return Math.floor(Math.random() * 100) % 2 === 0 ? true : false
}

export default function randomField() {
  return [
    {
      id: 1,
      column1: false,
      column2: Math.floor(Math.random() * 10) % 2 === 0 ? true : false,
      column3: Math.floor(Math.random() * 10) % 2 === 0 ? true : false,
      column4: randomMine(),
      column0: randomMine(),
    },
    {
      id: 2,
      column1: false,
      column2: false,
      column3: randomMine(),
      column4: false,
      column0: Math.floor(Math.random() * 10) % 2 === 0 ? true : false,
    },
    {
      id: 3,
      column1: Math.floor(Math.random() * 10) % 2 === 0 ? true : false,
      column2: randomMine(),
      column3: randomMine(),
      column4: Math.floor(Math.random() * 10) % 2 === 0 ? true : false,
      column0: randomMine(),
    },
    {
      id: 4,
      column1: randomMine(),
      column2: false,
      column3: randomMine(),
      column4: false,
      column0: false,
    },
    {
      id: 5,
      column1: randomMine(),
      column2: randomMine(),
      column3: Math.floor(Math.random() * 10) % 2 === 0 ? true : false,
      column4: false,
      column0: false,
    }
  ]
}