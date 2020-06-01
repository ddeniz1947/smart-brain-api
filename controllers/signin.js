

let bool = false;
const handleSignin = (db,bcrypt) =>(req, res) => {
  const { email, name, password } = req.body;
  if(!email || !password){
    return res.status(400).json('incorrect form submission'); // Eğer burda kalmasını istiyorsan return etmeliyiz
 }
    db.select('email','hash').from('login')
    .where('email', '=',email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if(isValid){
        return  db.select('*').from('users')
          .where('email','=',email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => res.status(400).json('Unable to get user'));
      }
      else{
       return res.status(400).json('Wrong Password');
      }
    })
    .catch(err => res.status(400).json('Wrong Email'));
}

module.exports={
    handleSignin : handleSignin
}