const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'denizcan47',
        database: 'smart-brain'
    }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send(database.users);
})
app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)});
app.post('/signin',signin.handleSignin(db,bcrypt)); //Böyle kullanırsak ilk önce db ve bcrypt çalışır sonra req,res çalışır (Ya dosya içinde req,res verecez ya da burda (db,bcrypt)(req,res) şeklinde burda vercez)
app.get('/profile/:id', (req, res)=> {profile.handleProfileGet(req,res,db)});
app.put('/image', (req, res)=> {image.handleImage(req,res,db)});
app.post('/imageurl', (req, res)=> {image.handleApiCall(req,res)});

app.listen(process.env.PORT || 3000, () => {
    console.log(` WORKING ${process.env.PORT}` );
})


//SELECT QUERY WİTH KNEX
// db.select('*').from('users').then(data => {
// console.log(data);
// })

// const database = {
//     users: [
//         {
//             id: 0,
//             name: 'john',
//             email: 'john@gmail.com',
//             password: 'cookies',
//             entries: 5,
//             joined: new Date()
//         },

//         {
//             id: 1,
//             name: 'Sally',
//             email: 'sally@gmail.com',
//             password: 'bananas',
//             entries: 4,
//             joined: new Date()
//         }
//     ]
//     // login: [
//     //     {
//     //         id: '987',
//     //         hash: '',
//     //         email: 'john@gmail.com'
//     //     }
//     // ]
// }



// let bool = false;
// app.post('/signin', (req, res) => {
   
//     db.select('email','hash').from('login')
//     .where('email', '=',req.body.email)
//     .then(data => {
//       const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
//       if(isValid){
//         return  db.select('*').from('users')
//           .where('email','=',req.body.email)
//           .then(user => {
//             res.json(user[0]);
//           })
//           .catch(err => res.status(400).json('Unable to get user'));
//       }
//       else{
//        return res.status(400).json('Wrong Password');
//       }
//     })
//     .catch(err => res.status(400).json('Wrong Email'));

//     // for (let i = 0; i < database.users.length; i++) {

//     //     if (req.body.email === database.users[i].email && req.body.password === database.users[i].password) {
//     //         console.log('success');
//     //         return res.json(database.users[i]);

//     //     }
//     //     else {
//     //         console.log('404');
//     //         return res.status('400').json('error logging in');

//     //     }
//     // }
//     // if (bool == true) {
//     //     console.log(1);

//     // }
//     // else {
//     //     console.log(2);

//     // }
// })

// app.post('/register', (req, res) => {
//     const { email, name, password } = req.body;

//     const hash = bcrypt.hashSync(password);
//     db.transaction(trx => {
//         trx.insert({
//             hash: hash,
//             email: email
//         })
//             .into('login')
//             .returning('email')
//             .then(loginEmail => {
//                 return trx('users')
//                     .returning('*')
//                     .insert({
//                         email: loginEmail[0],
//                         name: name,
//                         joined: new Date()
//                     }).then(user => {
//                         res.json(user[0]);
//                     })
//             })
//             .then(trx.commit)
//             .catch(trx.rollback)
//     })
//      .catch(err => res.status(400).json(false))

//     // database.users.push({
//     //     id: database.users[database.users.length],
//     //     name: name,
//     //     email: email,
//     //     password: password,
//     //     entries: 0,
//     //     joined: new Date()
//     // })
//     // db('users')
//     //     .returning('*')
//     //     .insert({
//     //         email: email,
//     //         name: name,
//     //         joined: new Date()
//     //     }).then(user => {
//     //         res.json(user[0]);
//     //     })
//     //     .catch(err => res.status(400).json('unable to register'));

//     // res.json(database.users[database.users.length - 1]);
// });



// app.get('/profile/:id', (req, res) => {
//     const { id } = req.params;
//     db.select('*').from('users').where({
//         id: id                             //=> bunun yerine where({id}) diyebiliriz ES6 ile gelmiş ikisi de aynı isimde oldugundan 
//     }).then(user => {
//         if (user.length) {
//             res.json(user[0]);
//         }
//         else {
//             res.status(400).json('Not Found');
//         }

//     })
//         .catch(err => res.status(400).json('Error Getting User'));

//     // if (!found) {
//     //     res.status(400).json('user not found');
//     // }

//     // database.users.forEach(user => {
//     //     if (user.id === parseInt(id)) {
//     //         found = true;
//     //         return res.json(user);
//     //     }
//     // })
//     // if (!found) {
//     //     res.status(400).json('user not found');
//     // }

// });


// app.put('/image', (req, res) => {
//     console.log(req.body, 'id');
//     const { id } = req.body;
//     let found = false;
//     db('users').where('id', '=', id)
//         .increment('entries', 1)
//         .returning('entries')
//         .then(entries => {
//             res.json(entries[0]);
//         })
//         .catch(err => res.status(400).json('unable to get entries'));

//     // database.users.forEach(user => {
//     //     if (user.id === parseInt(id)) {
//     //         found = true;
//     //         user.entries++;
//     //         return res.json(user.entries);
//     //     }
//     // })
//     // if (!found) {
//     //     res.status(400).json('not found');
//     // }
// })





// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });