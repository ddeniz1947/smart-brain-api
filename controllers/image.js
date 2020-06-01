

const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '63a91100bc474995bc84608688334c82'
});
const handleApiCall = (req,res) => {
    console.log(req.body.input);
    app.models
    .predict( Clarifai.FACE_DETECT_MODEL,req.body.input)
        .then(data => {
            res.json(data);
            console.log(data);
        })
        .catch(err => res.status(400).json('Unable to connect Api'))
}


const handleImage = (req, res, db) => {
    const { id } = req.body;
    let found = false;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
    handleImage: handleImage,
    handleApiCall : handleApiCall
}