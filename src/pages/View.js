import React ,{useState,useEffect} from 'react'
import fireDb from '../firebase';
import { useParams,Link } from 'react-router-dom';
import './View.css';





const View = () => {

    const [user,setUser]= useState({});

    const {id} = useParams();

    useEffect(()=>{
        fireDb.child(`/contacts/${id}`).get().then((Record) => {
        if(Record.exists()){
        setUser({...Record.val()});
    }else{
        setUser({});
    }
        })

    },[id])


    console.log("USER",user);


  return (
    <div style={{marginTop:"150px"}}>
        <div className='card'>
        <div className='card-header'>
            <p>User Contact Details </p>
        </div>
        <div className="container">
            <strong>ID: </strong>
            <span>{id}</span>
            <br/>
            <br/>
            <strong>NAME: </strong>
            <span>{user.name}</span>
            <br/>
            <br/>
            <strong>EMAIL: </strong>
            <span>{user.email}</span>
            <br/>
            <br/>
            <strong>CONTACT: </strong>
            <span>{user.contact}</span>
            <br/>
            <br/>

            <Link to="/">
                <button className='btn btn-edit'>Go Back</button>
            </Link>
        </div>
        </div>
    </div>
  )
}

export default View