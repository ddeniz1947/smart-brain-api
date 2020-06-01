

const handleProfileGet = (req, res,db) => {
    const { id } = req.params;
    db.select('*').from('users').where({
        id: id                             //=> bunun yerine where({id}) diyebiliriz ES6 ile gelmiş ikisi de aynı isimde oldugundan 
    }).then(user => {
        if (user.length) {
            res.json(user[0]);
        }
        else {
            res.status(400).json('Not Found');
        }

    })
        .catch(err => res.status(400).json('Error Getting User'));
}
module.exports={
    handleProfileGet : handleProfileGet
}