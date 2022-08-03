let friends = [
  {
    id: 1,
    name: "coco",
    Height: 165,
    age: 36,
    area: "中山區",
  },
  {
    id: 2,
    name: "Tina",
    Height: 161,
    age: 25,
    area: "松山區",
  },
  {
    id: 3,
    name: "Max",
    Height: 182,
    age: 32,
    area: "松山區",
  },
  {
    id: 4,
    name: "Bro",
    Height: 176,
    age: 21,
    area: "信義區",
  },
];

// 找出大於30歲的朋友
let result = friends.filter((friend) => friend.age > 30);
console.log(result);

// for-loop
function filter(friends) {
  let over30Arr = [];
  for (let i = 0; i < friends.length; i++) {
    if (friends[i].age > 30) {
      over30Arr.push(friends[i]);
    }
  }
  return over30Arr;
}
console.log(filter(friends));

// ans:
// [
//   { id: 1, name: "coco", gender: "female", age: 36, area: "中山區" },
//   { id: 3, name: "Max", gender: "male", age: 32, area: "松山區" },
// ];
