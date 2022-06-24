

function getUser(req, res) {
    return res.status(200).send("testi")
}

function createUser(req, res){
    const username = req.body.username
    return res.send(JSON.stringify(username))
}

module.exports = {
    getUser,
    createUser
}