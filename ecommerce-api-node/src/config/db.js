const  mongoose  = require("mongoose");

const mondbUrl =
  "mongodb+srv://bheemisettysharmila4590:5De2LGs1vpnbM8uS@cluster0.ly7tu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectDb=()=>{
    return mongoose.connect(mondbUrl);
}
module.exports={connectDb}