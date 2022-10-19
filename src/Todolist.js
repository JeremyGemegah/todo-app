import {useState,useEffect} from 'react';
import axios from 'axios';
import Addtodo from './Addtodo';
import styles from "./Todolist.module.css";
import {Link} from "react-router-dom";

function Todolist(){

    const [todos,setTodos] = useState();

    const data ={
        "posts": [
          
            {"id":1666038676997,"text":"rice","completed":false},
            {"id":1666038676998,"text":"rice","completed":false},
            {"id":1666038676999,"text":"rice","completed":true},
            {"id":1666038676990,"text":"rice","completed":false},
            {"id":1666038676991,"text":"rice","completed":false},
            {"id":1666038676992,"text":"rice","completed":false}
          
        ]
      };
  

  useEffect(() => {
     const loadtodos = async () => {
        try{
            let ltodos = await axios.get("http://localhost:8000/posts")
            setTodos(ltodos.data)
        }catch(err){
            console.log(err)
        }
      }


    
    loadtodos();

},[]);

const handleremove = (e) =>{
    axios.delete(`http://localhost:8000/posts/${e}`).then( async () => {
        try{
            let ltodos = await axios.get("http://localhost:8000/posts")
            setTodos(ltodos.data)
        }catch(err){
            console.log(err)
        }
      }


    
    )

   
}

const handlecheck = (e) =>{
    e = {...e, "completed":!e.completed};
    axios.put(`http://localhost:8000/posts/${e.id}`,e).then( async () => {
        try{
            let ltodos = await axios.get("http://localhost:8000/posts")
            setTodos(ltodos.data)
        }catch(err){
            console.log(err)
        }
      }


    
    )
    
}





    return (

        <div className={styles.main_wrapper}>
            <div className={styles.header}>
            <Link to="addtodo"><button className={styles.addnew} >Add New</button></Link>
            </div>

            <div className={styles.board}><div className={styles.wrapper}>

                {(todos && todos.length) >0 ? 
                
                (
                    todos.map((item) => (
                        <div key={item.id} className={item.completed ?  styles.activeitem: styles.item}>
                            <div className={styles.check}><input type ='checkbox' checked ={item.completed} onChange={() => handlecheck(item)}/>
                            
                            <button className={styles.remove} onClick={() => handleremove(item.id)}>X</button>
                            <Link to='addtodo' state={item}><button className={styles.edit}>Edit</button></Link>
                            
                            </div>

                            <div className={styles.item_title}><h2>{item.title}</h2></div>

                             <div className={styles.item_content}>{item.text}</div>
                             
                             </div>

                    ))



                )
                 : ( <div><h3> Sorry, no todos here</h3></div>)

                }
            </div>
            </div>
        </div>

    )


}

export default Todolist;