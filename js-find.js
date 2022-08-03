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

// 找出住在"松山區"的朋友
let result = friends.find((friend) => friend.area === "松山區");
console.log(result);
//ans:
// [
// {
//     id: 2,
//     name: "Tina",
//     Height: 161,
//     age: 25,
//     area: "松山區",
//   },
// ];

// for-loop
function find(friends) {
  let findArr = [];
  for (let i = 0; i < friends.length; i++) {
    if (friends[i].area === "松山區") {
      findArr.push(friends[i]);
    }
  }
  return findArr;
}
console.log(find(friends));

//ans:
// [
// {
//     id: 2,
//     name: "Tina",
//     Height: 161,
//     age: 25,
//     area: "松山區",
//   },
// {
//     id: 3,
//     name: "Max",
//     Height: "male",
//     age: 32,
//     area: "松山區",
//   },
// ];
