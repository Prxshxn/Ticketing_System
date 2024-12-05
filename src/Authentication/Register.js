import React,{useSatate, useState} from "react";
import { Form,Button,Containe } from "react-bootsrap";

function Register(){
    const[formData,stFormData] = useState({
        username:'',
        email:'',
        password:'',
        role:'Customer'
    });

    const hadleChange =(e) =>{
        const {name,value} = e.target;
        setFormData(prevState =>({
            ...prevState,
            [name]:value

           }));

    };

    const hadleSubmit
}