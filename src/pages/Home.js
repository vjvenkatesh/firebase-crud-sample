import React,{useState , useEffect} from 'react'
import fireDb from '../firebase';
import "./Home.css"



const Home = () => {

    const [data,setData]=useState({});

    useEffect(()=>{
        fireDb.child("contacts").on("value" , (Records)=>{
            if(Records.val() !== null){
                //get all data from Records.val();
                const data=Records.val();
                //then set that record to data hook
                setData({...data});
                // console.log("data from fb",Records.val());
            }
            else{
                setData({});
            }
        });
        return()=>{
            setData({});
        }
    },[]);

    return (
    <div style={{marginTop:"100px"}}>
      <table className='styled-table'>
        <thead>
            <tr>
                <th style={{textAlign:"center"}}>No:</th>
                <th style={{textAlign:"center"}}>Name:</th>
                <th style={{textAlign:"center"}}>Email:</th>
                <th style={{textAlign:"center"}}>Contact:</th>
                <th style={{textAlign:"center"}}>Action:</th>
            </tr>
        </thead>
        <tbody>
            {Object.keys(data).map((id,index)=>{
                return(
                    <tr key={id}>
                        <th scope='row'>{index +1}</th>
                        <td>{data[id].name}</td>
                        <td>{data[id].email}</td>
                        <td>{data[id].contact}</td>
                    </tr>
                )
            })}
        </tbody>

      </table>
    </div>
  )
}

export default Home