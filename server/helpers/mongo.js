const mongoose =require('mongoose')
const uri=process.env.DATABASE_ACCESS

const connetDb=async()=>{
    try{
        await mongoose.connect(uri,{
            useNewUrlParser:true,
        },()=>{
            console.log('mongodb is connected');
        })
    }catch(error){
        console.log(error);
    }
}

module.exports={connetDb}        