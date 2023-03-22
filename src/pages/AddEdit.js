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
    const [data, setData] = useState({});
    // console.log(state.name);
    const { name, email, contact } = state;


    const history =useHistory();
    
    const {id} = useParams();

    
    useEffect(()=>{
        fireDb.child("contacts").on("value" , (Records)=>{
            if(Records.val() !== null){
                //get all data from Records.val();
                const data1=Records.val();
                //then set that record to data hook
                setData({...data1});
                // console.log("data from fb",Records.val());
            }
            else{
                setData({});
            }
        });
        return()=>{
            setData({});
        }
    },[id]);

    useEffect(()=>{
        if(id){
            setState({...data[id]})
        }
        else{
            setState({...initialState})
        }
        return()=>{
            setState({...initialState})
        }

    },[id, data])
     
    
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

            if(!id){
                fireDb.child("contacts").push(state , (err) =>{
                    if(err){
                        toast.error(err);
                    }
                    else{
                        toast.success("success");
                    }
                });

            }else{
                fireDb.child(`contacts/${id}`).set(state , (err) =>{
                    if(err){
                        toast.error(err);
                    }
                    else{
                        toast.success("Update successfully");
                    }
                });

            }
       
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
                    value={name || ""}
                    onChange={handleInputChange} />
                <label htmlFor='email'>Email</label>
                <input type="text"
                    id='email'
                    name="email"
                    placeholder='your email ....'
                    value={email || ""}
                    onChange={handleInputChange} />
                <label htmlFor='contact'>Contact</label>
                <input type="number"
                    id='contact'
                    name="contact"
                    placeholder='your contact ....'
                    value={contact || ""}
                    onChange={handleInputChange} />

                <input type="submit" value={id ? "Update" : "Save"} />
            </form>

        </div>
    )
}

export default AddEdit