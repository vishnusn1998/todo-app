import './App.css';
import {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import store from "store";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const storeKey = "ToDo-App-Key"
const useStyles = makeStyles({
  root: {
    
  },
 
  title: {
    fontSize: 14,
    textAlign: "center",
    justifyContent: "center",
    textTransform:"uppercase"
  },
  pos: {
    marginBottom: 12,
  },
});

function App() {

  const classes = useStyles();

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');

  
  useEffect(() => {
    if(typeof store.get(storeKey) !== "undefined"){
      setTodos(store.get(storeKey).todos);
    
    }
  }, []);

  useEffect(() => {
    store.set(storeKey, { todos: todos})
  }, [todos]);


  const resetField = ()=> {
    setTodo("")
  }

  const deleteTask = (index)=> {

    var ask = window.confirm("Do you want to delete the task?");
    if (ask) {
      const test = [...todos];
        test.splice(index, 1);

        setTodos(test)
    }else {
      console.log("Don't delete");
    }

   
  }


  const handleAdd = (e,i) => {

    e.preventDefault();
   
    if(todo === ""){
      console.log("err")
      alert("Field empty!")
    }else{
      setTodos([...todos,{id:Date.now(), text:todo, status:false}]);
      resetField();
    }
   
  }


  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo App by Vishnu</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Never be late again !</h2>
      </div>
      <br></br>
      <form onSubmit={handleAdd}>
      <div className="input">
        <input onKeyPress={(e)=>{
          if(e.keycode === 13){
            handleAdd();
          }
        }} style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif", textTransform: "uppercase"}} value={todo} onChange={(e)=>{setTodo(e.target.value)}} type="text" placeholder="  ADD ITEM" />
       <button style={{border:"none", backgroundColor:"white"}} type="submit"><i style={{fontSize:"22px", marginRight:"0.9rem"}} className="fas fa-plus" ></i></button> 
      </div></form>
     <br></br>
          <div className="todos">
      <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        All tasks
        </Typography>
        <br></br>
        {
       
       todos.map((obj, index)=> {
         return(
        <div className="todo">
          
            <div className="right">
            <p className="content">{index + 1}. {obj.text}</p>
            <div className="buttons">
            <input type="checkbox" name="" id="" value={obj.status} onChange={(e)=>{
                console.log(e.target.checked)
                console.log(obj)
                setTodos(todos.filter(obj2=>{
                  if (obj2.id === obj.id){
                    obj2.status = e.target.checked
                  }
                  return obj2
                }))
              }} />
              
              
              <i style={{marginTop:"-2px", fontSize: "16px"}} onClick={()=>deleteTask(index)}
              // onClick={(e, i)=>{
              //   var test = [...todos]
              //   const {id} = e.target.parentElement
               
              //     test.splice(id, i);
              //     setTodos(test)
               
              // }} 
              className="fas fa-trash"></i>
              
              </div>
              
            </div>
            <Divider/>
            <br></br>
          </div>
            )
    
          })  
         
          }
          
      </CardContent>
    
    </Card>
         
        </div>
        <br></br>

        <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        Tasks done
        </Typography>
        <br></br>
      
      {todos.map((obj, index)=> {
     
          
          if(obj.status){
          return(
            <>
            <div className="done">
           
            <p className="content">{index + 1}. {obj.text}</p>
            </div>
            <Divider/>
            <br></br>
            </>
          )
            
         
          }
         
          return null
    
      })}
         </CardContent>
    
    </Card>
    </div>
  );
}

export default App;
