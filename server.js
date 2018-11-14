const express=require('express');

const bodyParser=require('body-parser');

const bcrypt=require('bcrypt-nodejs');

const cors=require('cors');

const knex=require('knex');

const register=require('./controllers/register');

const signIn=require('./controllers/signin');

const profile=require('./controllers/profile');

const image=require('./controllers/image');
const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'ganesha21',
    database : 'smartbrain'
  }
});
/*db.select('*').from('users').then(data=>{
	console.log(data);
});*/ 

const app=express();

app.use(bodyParser.json());
app.use(cors())

app.get('/',(req,res)=>{
	res.send(database.users);
})

app.post('/signin',signIn.handleSignIn(db,bcrypt))

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})

app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})



// Load hash from your password DB.
/*bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});*/

app.listen(3000,()=>{
	console.log('app is running on port 3000');
});