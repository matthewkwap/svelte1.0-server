const express = require('express')
const app = express()
const cors= require('cors')
const pool = require('./db')
const ndeb = require('./newdb')
let idd;
let fs  =require('fs')
var path = require('path');

var pg = require('pg');
/*client.query(`SELECT * FROM u WHERE userid = $1`,[a.id], function(err, result) {
        if(err) {
            console.log(err);
            let bob = {
                created:false
            }
            res.json(bob)
        }
      
          let bob = {
        userid:result.rows[0],
        db:result.rows[0],
        created:true
    } */

//middleware
app.use(cors())
app.use(express.urlencoded())
app.use(express.json())
app.use('/log', express.static(path.join(__dirname, 'pictures')))
//`CREATE TABLE map(user_id SERIAL PRIMARY KEY,usern VARCHAR(255),pass VARCHAR(255));`
async function create(){
    try {
        //"INSERT INTO tod (description) VALUES($1) RETURNING *",["matthew"]
        let all = "SELECT * FROM users"
        let create ="CREATE TABLE  todo_id SERIAL PRIMARY KEY,description VARCHAR(255),pending VARCHAR(255)"
      //"UPDATE Uer SET password = $1 WHERE id = $2 RETURNING *", ["kmatthew","matthew"]
            const newTodo = await pool.query("CREATE TABLE u( userid VARCHAR(255))");
            //let newt = await pool.query("UPDATE tod SET usern = $1 WHERE user_id = $2", [description.des,description.idous])
            //const newTodo = await pool.query("INSERT INTO tod (description) VALUES($1) RETURNING *",[description.info.descript]);
            console.log(newTodo.rows)

         
     } catch (error) {
         console.log(error.message)
         
     }
}
/*
const client = new Client({
    connectionString: "postgres://zlbgubufivhxss:12aad33969af8a313d3f79a8e7197af64c55e7048cc91189a9c53d8721e0c3c9@ec2-52-44-139-108.compute-1.amazonaws.com:5432/d604oldtl5h2er",
    ssl: {
      rejectUnauthorized: false
    }
  })
*/
var conString = "postgres://wejfusvs:2YrZJWVz5F2jEDdR6qvp6zidf5Kmq7Zr@ruby.db.elephantsql.com:5432/wejfusvs" //Can be found in the Details page
var client = new pg.Client(conString);

client.connect();
function no(no){
    client.query(`SELECT * FROM u WHERE userid = $1`,[no], function(err, result) {
        if(err) {
            console.log(err);
            let bon = {
                created:false
            }
            return bon
        }
      
          let bob = {
        userid:result.rows[0],
        db:result.rows[0],
        created:true    
}
return bob
})
}
function me(me){
    client.query("INSERT INTO u (userid) VALUES($1) ",[me], function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
      
         
        client.end();
    })
}
//ROUTES//
app.post('/newuser',async (req,res)=>{
    
         let a  = {
        id:req.body.id
    }
    client.query(`CREATE TABLE ${a.id}(
        todo_id SERIAL PRIMARY KEY,
        description VARCHAR(255),
        time VARCHAR(255)
        
    );`, function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
      
         
        client.end();
    })
    me(a.id)
    let f = no(a.id)

    res.json
    
    })
  //  const newTodo = await pool.query("INSERT INTO u (userid) VALUES($1) ",[a.id]);
    //const t = await pool.query(`SELECT * FROM u WHERE userid = $1`,[a.id])

   
   
   




app.post('/auth', async(req,res) =>{
   
        let a = {
        id:req.body.id
    }
    let r = a.id
    console.log(r);

    client.query(`SELECT * FROM u `, function(err, result) {
        if(err) {
            console.log(err)

        let bb = {
           authenticated:false
       }
       res.json(bb)
       }
       let i1 =  result.rows[0].userid
       if(i1 === a.id){
       let bob = {
           userid:result.rows[0].userid,
           db:result.rows[0].userid,
           authenticated:true
       }
        res.json(bob)
       }
         
        client.end();
    })
      
  //  i = await pool.query(`SELECT * FROM u WHERE userid = $1`,[a.id]); 
    

   
    
    

})


//get user info and authenticate
app.post('/a/', async(req,res) =>{
 
        let a  = {
        id:req.body.id,
       
        
      }
      client.query(`SELECT * FROM u WHERE userid = $1`,[a.id], function(err, result) {
        if(err) {
            console.log(err)

            let returned = {
                authenticated:false
            }
            console.log("failed");
            res.json(returned)
        }
       let i1 =  result.rows[0].id
       console.log(a.id);
       console.log(i1);
       console.log(i2);
      if(a.id == i1 && a.password == i2){
          let retured = {
              authenticated:true
          }
          console.log("succes");
          res.json(retured)
          
     }
         
        client.end();
    })
     
     // let i =  newTodo = await pool.query(`SELECT * FROM u WHERE userid = $1`,[id]); 
      
    
   
})


// CREATE ATODO
app.post('/todos', async(req,res) =>{
    try {
       const description = req.body;
       console.log(description)
              
     client.query(`INSERT INTO ${description.info.db} (description,time) VALUES($1,$2) RETURNING *`,[description.info.descript,description.info.time], function(err, result) {
        if(err) {

          return console.error('error running query', err);
        }
       res.json(result.rows)
         
        client.end();
    })
      // const newTodo = await pool.query(`INSERT INTO ${description.info.db} (description,time) VALUES($1,$2) RETURNING *`,[description.info.descript,description.info.time]);
      // const newt = await pool.query("INSERT INTO tod (time) VALUES($1) RETURNING *",[description.info.Time]);
       //res.json(newTodo.rows )

        
    } catch (error) {
        console.log(error.message)
        
        
    }

}) 



//GET ALL TODO

app.get('/todos/:db', async(req,res) =>{
   
        let id = req.params;
       let r = id.db
       client.query(`SELECT * FROM ${r}`, function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
       res.json(result.rows)
         
        client.end();
    })
       //const allTodos = await pool.query(`SELECT * FROM ${r} `) 
       //res.json(allTodos.rows)
       
        
  

})

app.get("/todos/:db/:id", async(req,res) =>{
    try {
        const {id,db} = req.params;
        client.query(`SELECT * FROM ${db} WHERE todo_id = $1`,[id], function(err, result) {
            if(err) {
              return console.error('error running query', err);
            }
           res.json(result.rows[0])
             
            client.end();
        })
 //    const todo = await pool.query(`SELECT * FROM ${db} WHERE todo_id = $1`,[id])

   //  res.json(todo.rows[0])
        
    } catch (error) {
        console.log(error.message)
    }
})




//UPDATE TODO
app.put('/todos/', async (req,res) =>{
    try {
        const {db,id} = req.params;
      
        
        const description = req.body
        client.query(`UPDATE ${description.db} SET description = $1 WHERE todo_id = $2`, [description.des,description.idous], function(err, result) {
            if(err) {
              return console.error('error running query', err);
            }
           res.json("todo was updated")
             
            client.end();
        })
    
        console.log(description)
       // const updatetodo = await pool.query(`UPDATE ${description.db} SET description = $1 WHERE todo_id = $2`, [description.des,description.idous])
       
        //res.json("todo was updated")
    } catch (error) {  
        console.log(error.message) 
    }

})


app.delete('/todos/:db/:id', async(req,res) =>{
    try {
        const {db,id} = req.params;
        client.query(`DELETE FROM ${db} WHERE todo_id = $1`, [id], function(err, result) {
            if(err) {
              return console.error('error running query', err);
            }
           res.json("deleted")
             
            client.end();
        })
        
      //  const deleteTodo = await pool.query(`DELETE FROM ${db} WHERE todo_id = $1`, [id])
    //    res.json("it wass deleted")        
    } catch (error) {
        console.log(error.message)
    }
})


//DELETE A TODO
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
