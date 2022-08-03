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
  

// //  map() 特色
// 會透過函式內所回傳的值組合成一個新的陣列
// 並不會改變原陣列 
// 回傳數量會等於原始陣列的長度
// 如果不回傳則是 undefined

// BMI = 體重(公斤) / 身高2(公尺2)

let BMI = friends.map(friend => friend.weight/ (friend.height**2))
console.log(BMI)


//for-loop
function bmi(friends){
    let bmiTotal = [];
    for (let i = 0; i < friends.length; i++){
        bmiTotal.push(friends[i].weight/ ( friends[i].height**2))
    }
    return bmiTotal
}

console.log(bmi(friends))