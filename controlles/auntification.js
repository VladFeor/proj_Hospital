const {User} = require('../modals')

const Registration = async (req,res) =>{
    const {username,password} = req.body

    if(!username || !password){
        res.status(400).send('No correct name or password')
        return;
    }
    try{
        const user = await User.create({username,password})
        console.log("user created!");

    }
    catch(err){
        res.status(500).send('This user already exists, think of another login')
        return;
    }
    res.redirect('/login')
}


const Logining = async (req,res) =>{
    const {username,password} = req.body
    
    if(!username || !password){
        res.status(400).send('No correct name or password')
        return;
    }
    try{
        const user = await User.findOne({where:{username}})
        if(!user){
            res.status(401).send("no correct name or password")
            return;
        }

        if(user.password == password){
            console.log("User " + username + " loggined!")
        }
        else{
            res.status(500).send("Error server, not true password!")
        }
        
    }
    catch(err){
        res.status(500).send('Error server, not true data')
        return;
    }
    res.redirect('/')
}

module.exports = {
    Registration,
    Logining,
}