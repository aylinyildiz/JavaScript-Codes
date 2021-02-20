import "./styles.css";

//1- Bir arraydan tekrarlananları kaldırma
const values = [3, 1, 3, 5, 2, 4, 4, 4];
const uniqueValues = [...new Set(values)];
console.log(uniqueValues);

//2- case-sensitive search
//filter() metodu yeni bir dizi oluşturur
const users = [
  { id: 11, name: "Adam", age: 23, group: "editor" },
  { id: 47, name: "John", age: 28, group: "admin" },
  { id: 85, name: "William", age: 34, group: "editor" },
  { id: 97, name: "Oliver", age: 28, group: "admin" }
];
let res = users.filter((it) => it.name.includes("oli"));
//console.log(res);
//console.log(users);

//3- case-insensitive search
let res1 = users.filter((it) => new RegExp("oli", "i").test(it.name));
console.log(res1);

//4-check if any of the users have admin rights
// some() metodu dizideki en az bir öğenin sağlanan
//işlev tarafından uygulanan testi geçip geçmediğini test eder.
const hasAdmin = users.some((user) => user.group === "admin");
console.log(hasAdmin); //true

//5- Flattening an array of arrays (diziyi düzleştirme)
//ilk dizi ikinci [1,2,3....] devam eden diziye dönüşür.
const nested = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
let flat = nested.reduce((acc, it) => [...acc, ...it], []);
console.log(flat);
//shorter way without Array.reduce:
let flat2 = [].concat.apply([], nested);

//6-Create an object that contains the frequency of the specified key
/*
const users = [
  { id: 11, name: 'Adam', age: 23, group: 'editor' },
  { id: 47, name: 'John', age: 28, group: 'admin' },
  { id: 85, name: 'William', age: 34, group: 'editor' },
  { id: 97, name: 'Oliver', age: 28, group: 'admin' }
]; // yukarıda tanımlı
*/
//gruptaki kişilerin yaşlarından kaçar tane olduğunu gösterir
const groupByAge = users.reduce((acc, value) => {
  acc[value.age] = acc[value.age] + 1 || 1; // yaşı aynı olan varsa +1 ekle yoksa 1 yaz
  return acc;
}, {});
console.log(groupByAge);

//7.Indexing an array of objects (lookup table) ->dizi nesnesinin indexlenmesi
// id ye göre indexleniyor
const uTable = users.reduce((acc, value) => ((acc[value.id] = value), acc), {});
console.table(uTable);

//8-  Extract the unique values for the given key of each item in the array
//dizideki grupları gösterir
const listOfUserGroups = [...new Set(users.map((value) => value.group))];
console.log(listOfUserGroups);

//9- Object key-value map reversal
//object key-value yerdeğiştimesi --- ör: france lyon yer değiştirir
const cities = {
  Lyon: "France",
  Berlin: "Germany",
  Paris: "France"
};

let countries = Object.keys(cities).reduce(
  (acc, value) => (
    (acc[cities[value]] = [...(acc[cities[value]] || []), value]), acc
  ),
  {}
);
console.log(countries); // burada spread operatoru(...) kullanılmadı
// yukarıdaki kodda parantez içindeki son değer döner -acc
//bu kodu daha iyi şekilde yazalım
/*
let countries = Object.keys(cities).reduce((acc,value) => {
  let country = cities[value];
  acc[country] = acc[country] || [];
  acc[country].push(value);
  return acc;
}, {});
console.log(countries)
*/ //reduce() çağrısında yeni bir dizi yaratılır. performans kaybına yol açar : O (n^2)
//bunun yerine push() iyi bir yöntemdir.

//10-Create an array of Fahrenheit values from an array of Celsius values
// dizideki her indexi bir formülle işleniyor gibi düşünün
const celsius = [-15, -5, 0, 10, 16, 20, 24, 32];
const fahrenheit = celsius.map((value) => value * 1.8 + 32);
console.log(fahrenheit);

//11- Encode an object into a query string (nesneyi sorguya kopyala)
const params = { lat: 45, lng: 6, alt: 1000 };
const queryString = Object.entries(params)
  .map((p) => encodeURIComponent(p[0]) + "=" + encodeURIComponent(p[1]))
  .join("&");
console.log(queryString); // output : lat=45&lng=6&alt=1000

//12- Print a table of users as a readable string only with specified keys
// tablodan id, age, group getirir
const string = users
  .map(({ id, age, group }) => `\n${id} ${age} ${group}`)
  .join("");
console.log(string);
// bu kodu JSON.stringify daha iyi hale getirir ancak tablo olarak döndüremez
JSON.stringify(users, ["id", "name", "group"], 2);

//13-  Find and replace a key-value pair in an array of objects
//id si 47 olanın yaşını bir arttırdı
const updatedUsers = users.map((p) =>
  p.id !== 47 ? p : { ...p, age: p.age + 1 }
);
console.log(updatedUsers);

// 14 -  Union (A ∪ B) of arrays
const arrA = [1, 4, 3, 2];
const arrB = [5, 2, 6, 7, 1];
console.log([...new Set([...arrA, ...arrB])]);

// 15 - Intersection (A ∩ B) of arrays
const arr1 = [1, 4, 3, 2];
const arr2 = [5, 2, 6, 7, 1];
console.log(arr1.filter((it) => arr2.includes(it)));

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;
