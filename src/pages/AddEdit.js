import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './AddEdit.css';
import fireDb from '../firebase';
import { toast } from 'react-toastify';





const initialState = {
    name: "",
    email: "",
    contact: ""
}

const AddEdit = () => {

    const [state, setState] = useState(initialState);
    const [date, setData] = useState({});
    // console.log(state.name);
    const { name, email, contact } = state;


    const history =useHistory();
    
    
    const handleInputChange =(e)=>{
        const {name,value}=e.target;
        setState({...state , [name]: value});
    };


    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!name || !email || !contact){
            toast.error("Please provide each input...");
        }
        else{
            fireDb.child("contacts").push(state , (err) =>{
                if(err){
                    toast.error(err);
                }
                else{
                    toast.success("success");
                }
            });
            setTimeout(()=>history.push("/"),500)

        }
    };
    return (

        <div style={{ marginTop: "100px" }}>
            <form
                style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "400px",
                    alignContent: "center",
                }}
                onSubmit={handleSubmit}
            >
                <label htmlFor='name'>Name</label>
                <input
                    type="text"
                    id='name'
                    name="name"
                    placeholder='your name ....'
                    value={name}
                    onChange={handleInputChange} />
                <label htmlFor='email'>Email</label>
                <input type="text"
                    id='email'
                    name="email"
                    placeholder='your email ....'
                    value={email}
                    onChange={handleInputChange} />
                <label htmlFor='contact'>Contact</label>
                <input type="number"
                    id='contact'
                    name="contact"
                    placeholder='your contact ....'
                    value={contact}
                    onChange={handleInputChange} />

                <input type="submit" value="Save" />
            </form>

        </div>
    )
}

export default AddEdit