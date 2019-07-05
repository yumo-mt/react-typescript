let { Map, List, fromJS, toJS } = require('immutable');

let list = ['A', 'B', 'C', [1, 2, 3]];
let obj = { a: '1', b: '2', c: { c1: '3' } };

let $$List = fromJS(list);
let $$Obj = fromJS(obj)

// console.log($$List);
// console.log($$Obj);

// get、getIn

// let list1 = $$List.get(0);
// console.log(list1);
// let obj1 = $$Obj.get('a')
// console.log(obj1);
// let list2 = $$List.getIn([3,2])
// console.log(list2);
// let obj2 = $$Obj.getIn(['c','c1'])
// console.log(obj2);


// set setIn

// let $$List1 = $$List.set(4, 'E')
// console.log($$List1);
// let $$List2 = $$List.setIn([3, 1], 4)
// console.log($$List2);
// let $$Obj1 = $$Obj.set('d', '4')
// let $$Obj2 = $$Obj.setIn(['c', 'c2'], '4')
// console.log($$Obj1);
// console.log($$Obj2);

//  update\updateIn

// let $$List1 = $$List.update(2, () => 'D');
// console.log($$List1);
// let $$Obj1 = $$Obj.update('b', () => '222');
// console.log($$Obj1);

// let $$List2 = $$List.updateIn([3, 1], () => '2222')
// console.log($$List2);
// let $$Obj2 = $$Obj.updateIn(['c', 'c1'], () => '3333')
// console.log($$Obj2);


// delete delteteIn
// let $$List1 = $$List.delete(2);
// let $$List2 = $$List.deleteIn([3,1]);
// console.log($$List1);
// console.log($$List2);



// merge 
const Map1 = fromJS({
  a: 111,
  b: 222,
  c: {
    d: 333,
    e: 444
  }
});
const Map2 = fromJS({
  a: 111,
  b: 222,
  c: {
    e: 444,
    f: 555
  }
});
// merge 只覆盖第一层，强覆盖
// const Map3 = Map1.merge(Map2);
// console.log(Map3);
// const Map4 = Map1.mergeDeep(Map2);
// console.log(Map4);
// // 合并过程中可以进行一些操作
// const Map5 = Map1.mergeWith((oldData, newData, key) => {
//   if (key === 'a') {
//     return 666;
//   } else {
//     return newData
//   }
// }, Map2);
// console.log(Map5);

const avengers = fromJS({
  heroes: {
    type: {
      human: {
        ironMan: {
          name: 'Tony Stark'
        },
        captainAmerica: {
          name: 'Steve Rogers'
        }
      },
      god: {
        thor: {
          name: 'Thor'
        }
      }
    },
  }
});
const mergingAvengers = fromJS({
      human: {
        blackWidow: {
          name: 'Natasha Romanova'
        }
      }
});
const mergedAvengers = avengers.mergeDeepIn(['heroes', 'type'], mergingAvengers);
console.log(JSON.stringify(mergedAvengers.toJS()));
// {
//   "heroes":{
//       "type":{
//           "human":{
//               "ironMan":{
//                   "name":"Tony Stark"
//               },
//               "captainAmerica":{
//                   "name":"Steve Rogers"
//               },
//               "blackWidow":{
//                   "name":"Natasha Romanova"
//               }
//           },
//           "god":{
//               "thor":{
//                   "name":"Thor"
//               }
//           }
//       }
//   }
// }