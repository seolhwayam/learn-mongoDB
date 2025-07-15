// 자바스크립트 기초

// 배열
const day0fweeks = ["월요일","화요일","수요일","목요일","금요일"];
console.log(day0fweeks[day0fweeks.length-1]); //마지막

// map
const person = {
    name : "seol",
    mbti : "infj"
}
const key = "name"

console.log(person["name"]);
console.log(person[key]);


const animals = ["cat","dog"];


//foreach
animals.forEach((item, index, array) => {
    console.log(item)
});

//map
const newAnimals = animals.map((item)=>`${item}💜`);

newAnimals.forEach((item, index, array) => {
    console.log(item)
});

//filter : 조건식 리턴
const filterAnimals = animals.filter((item)=>{
    return item.startsWith("c");
});
console.log("🚀 ~ filterAnimals ~ filterAnimals:", filterAnimals)

//some/every

const someAnimal = animals.some((item)=> item.startsWith("y"));
console.log("🚀 ~ someAnimal:", someAnimal)



//logical operators
const user = {
    isLoggedIn : true, //로그인 여부
    role : "user" //"user" , "guest"   
}


const isAccessAdminPage = user.isLoggedIn && user.role ==='admin';
console.log("🚀 ~ isAccessAdminPage:", isAccessAdminPage)

if(isAccessAdminPage){
    console.log(`💌 관리자 페이지에 접근할 수 있습니다.`);
}else{
    console.log(`💢 관리자 페이지에 접근할 수 없습니다.`);
}




//로그인 된 사용자 "이거나" 롤이 amdin인 사용자만 true
const isAccessUserPage = user.isLoggedIn || user.role ==='admin';

if(isAccessUserPage){
    console.log(`💌  유저 페이지에 접근할 수 있습니다.`);
}else{
    console.log(`💢 유저 페이지에 접근할 수 없습니다.`);
}
