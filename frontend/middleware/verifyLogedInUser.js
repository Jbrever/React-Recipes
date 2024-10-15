import axios from "axios";
export default async function verifyLogedInUser(){
        try{
            const JWTtoken = localStorage.getItem("token");
            if(JWTtoken){
                let response = await axios.post('https://react-recipes-server.vercel.app/userAuth',{"token":JWTtoken})
                // let response = await axios.post('http://localhost:4000/userAuth',{"token":JWTtoken})
                return response
            }else{
                throw null
            }
        }
        catch(err){
            console.log("error occure during verify Token => ",err);
            return err
        }
    }