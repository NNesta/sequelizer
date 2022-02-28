const {Router} = require("express");
const controllers = require("../controllers");
const router = Router();


function isLoggedIn(req,res){
    req.user ? next(): res.status(401);
}
router.get('/', (req,res)=>{
    res.send("Welcome to our routes");
})
router.post('/users', controllers.createUser);
router.get('/users', controllers.getAllUsers);
router.get('/users/:id', controllers.getUserById);
router.put('/users/:id', controllers.updateUser);
router.delete('/users/:id', controllers.deleteUser);
// profile
router.post('/profile', controllers.createProfile);
router.get('/profile', controllers.getAllProfiles);
router.get('/profile/:id', controllers.getProfileById);
router.put('/profile/:id', controllers.updateProfile);
router.delete('/profile/:id', controllers.deleteProfile);

module.exports = router;

