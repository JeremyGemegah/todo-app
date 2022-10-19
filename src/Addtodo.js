import styles from './Addtodo.module.css';
import {Link, useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from 'axios';

function Addtodo() {

    const [atodo,setAtodo] = useState([])
    const [title,setTitle] =useState("")
    const [text,setText] = useState("")
    const [isedit,setIsedit] = useState(0);
    const [errm,setErrm] = useState(0)
    
    
 

    const location = useLocation();
    const item = location.state
    
    
    


    useEffect((() => {
      
        if(item){
            setAtodo(item)
            setTitle(item.title)
            setText(item.text)
            const oldid =item.id;
            
            setIsedit(1)
           
        }else{
        const oldid = item;
        }
        
            
    }),[])

    const handlesubmit = () => {
       

        axios.put(`http://localhost:8000/posts/${item.id}`,{
            title: title,
            text: text,
            completed: false
        })

        setIsedit(0)
        setTitle("")
        setText("")
    }

    const handleadd = async () => {
        try{
         await  axios.get("http://localhost:8000/posts/",{params: {title: title}}).then((res) => res.data.length>0? errthrow(): additem())
        }catch{

        }
    

    }

    const errthrow = () =>{
        setErrm(1)
        setTimeout(changeerr,3000)
        
        
    }
    
    const changeerr = () =>{
        setErrm(0)
    }

    const additem = () =>{
        axios.post(`http://localhost:8000/posts/`,{
            id: new Date().getTime(),
            title: title,
            text: text,
            completed: false
        })

        setIsedit(0)
        setTitle("")
        setText("")  
    }

    






    

return (
    <div className={styles.main_wrapper}>
        <div className={styles.wrapper}>
        <div className={styles.form_wrapper}>
        <form onSubmit={(e) => e.preventDefault()}>
            <div className={styles.heading}><h2>New Item</h2></div>

           { errm == 1 ?( <div className={styles.mess}><p> Please type in a different title</p><p>this one already exists</p></div>):("")}

            <div className={styles.title}>
            <label><span>Title</span><span>*</span></label>
            <input type="text" value={title? (title):("")} onChange={(e) => setTitle(e.target.value)}/>
            </div>

            <div className={styles.textarea}>
            <label>Action</label>
            <textarea value={text? (text):("")} onChange={(e) => setText(e.target.value)} ></textarea>
            </div>

            <div> { isedit == 1 ? (<button className={styles.additem_btn} onClick={() => handlesubmit()}>Submit Edit</button>):
            (<button className={styles.additem_btn} onClick={() => handleadd()} >Add Item</button>)
            }</div>

        </form>

        </div>

        <div><Link to='/'><button className={styles.viewitems_btn}>View Items</button></Link></div>
    </div>

    </div>
    
)

    
}


export default Addtodo;