// require("express");
import express from "express";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

const app = express();

//환경변수 로드
dotenv.config();

// JSON형태의 데이터를 객체로 반환
app.use(express.json());
app.use(express.urlencoded({extended : true}));

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

//MONGODB 연결
//MongoDB객체 생성(mongoDB와의 연결을 관리 및 상호작용)
const client = new MongoClient(MONGODB_URI);
const db = client.db(DB_NAME); //데이터베이스 선택
const collection = db.collection("users"); // 컬렉션 선택


//데이터 읽기
 app.get('/users',async (req,res)=>{
    try {
       
        // Cursor 객체 : 데이터를 한개씩 순차적으로 가져와  document를 반환, 한번에 다 가져오지 않고 순차적으로 반환
        const users = await collection.find().toArray();
        console.log(`🎈${users.length}`);
        console.log(`🎈${users}`);

        //응답
        res.status(200).json(users);
    } catch (error) {
        console.log(`⚠fetch errer : ${error}`)
        res.status(500).json({
            message : "Error fetching users",
            error : error.message
        });
    }
  })


  //데이터 추가
 app.post('/users',async (req,res)=>{

    try {
        //req/body : object
        //const name = req.body.name;    
        //const age = req.body.age;
        
        //구조분해 할당
        const {name,age,email} = req.body;
        
        const result = await collection.insertOne({...req.body, createdAt : new Date()});

        console.log("🚀 ~ app.post ~ result:", result)

    //응답
    res.status(201).json(result);
        
    } catch (error) {
          console.log(`⚠error creating users: ${error}`)
        res.status(500).json({
            message : "Error creating users",
            error : error.message
        });
    }
  })

app.put('/users/:id',async (req,res)=>{
    try {       
        //구조분해 할당
        const {id} = req.params; //string
        const data = req.body;
        
        const result = await collection.updateOne({
            _id: new ObjectId(id)
        },{
            $set : {...data,updateAt : new Date()}
        });

        console.log("🚀 ~ app.post ~ result:", result)

        if(result.matchedCount){
            //수정된 문서가 있는 경우 응답
            res.status(200).json(result);
            return
        }
        //수정된 문서가 없는 경우 응답
        res.status(404).json({
            message : "user not found or no changes name"
        }
        );
        

    } catch (error) {
          console.log(`⚠error updating users: ${error}`)
            res.status(500).json({
                message : "Error updating users",
                error : error.message
            });
    }
})


//데이터 삭제
app.delete('/users/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        
        //id값을 기준으로 사용자 삭제
        const result = await collection.deleteOne({
            _id: new ObjectId(id)
        });

        if(result.deletedCount){ //0이 아닌경우
            //삭제된 document가 있는 경우
            res.status(200).json({
                message : "user deleted",
                id
            })
            return
        }

        //삭제된 document가 없는 경우
        res.status(404).json({
            message : "user not found"
        })

    } catch (error) {
        console.log(`⚠error deleting users: ${error}`)
            res.status(500).json({
                message : "Error deleting users",
                error : error.message
            });
    }

});


//미션
 app.get('/users/:id',async (req,res)=>{
    try {
       
        const {id} = req.params;
        console.log(id);

        const users = await collection.find(
            {
                _id: new ObjectId(id)
            },
            {
                name: 1
            }
        ).toArray();

        console.log(`🎈${users.length}`);
        console.log(`🎈${users}`);

        //응답
        res.status(200).json(users);
    } catch (error) {
        console.log(`⚠fetch errer : ${error}`)
        res.status(500).json({
            message : "Error fetching users",
            error : error.message
        });
    }
  })



const connectDB = async () =>{
    try{
        //DB와의 연결 시도
        await client.connect();
        console.log("🎈MongoDB Connected");
    }catch(error){
        console.log(`⚠MongoDB ERROR : ${error}`);
    }
} //비동기 asyne


app.listen(8080, () =>{
    console.log("server running at....",PORT);
    connectDB();
});
