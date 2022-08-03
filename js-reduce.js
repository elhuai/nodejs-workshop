let friends = [
    {
      id: 1,
      name: "coco",
      height: 1.65,
      age: 37,
      weight: 52
    },
    {
      id: 2,
      name: "Tina",
      height: 1.61,
      age: 25,
      weight: 47
    },
    {
      id: 3,
      name: "Max",
      height: 1.82,
      age: 32,
      weight: 73
    },
    {
      id: 4,
      name: "Bro",
      height: 1.76,
      age: 21,
      weight: 65
    },
  ];

// 朋友的平均年齡

let ageTotle = friends.reduce((acc, item) => acc + item.age, 0)
let ageAvg = ageTotle / friends.length;
console.log(ageAvg); 
// 平均28.75歲

// for-loop
function reduce(friends) {
    let ageAry = 0;
      for (let i = 0; i < friends.length; i++) {
        ageAry += friends[i].age; 
      }
      return ageAry / friends.length;
  }
  console.log(reduce(friends));
// 平均28.75歲