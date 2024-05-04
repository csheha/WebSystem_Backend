import express from 'express';
import connectDB from '../config/db.js';
import User from '../models/usermodels.js';

const router = express.Router();

// Add new user 
router.post('/adduser', async (req, resp, next) => 
{   console.log(req.body);
    const {FirstName,LastName,role,email,gender,BirthDay,MobileNo,password,WorkEnvironment,position } = req.body;
  
    try 
    {    const newUser = new User
        ({
            FirstName: FirstName,
            LastName:LastName,
            role: role,
            email:email,
            gender: gender,
            BirthDay:BirthDay,
            MobileNo: MobileNo,
            password: password,
            WorkEnvironment:WorkEnvironment,
            position:position
        });
        
        //
        const savedUser = await newUser.save();
        resp.json(savedUser);
    } 
    catch (error) 
    {
        console.error(error.stack)
      next(error);
    }
});
  
  
/* GET all employees listing. */
router.get('/userslist', async (req, resp, next) => {

    try {
      const users = await User.find();
  
      var records = [];
      users.forEach(usr => {
        if (usr) {
          const usrsRecord =
          {
            usrid: usr._id,
            FirstName: usr.FirstName,
            LastName:usr.LastName,
            role: usr.role,
            email:usr.email,
            gender: usr.gender,
            BirthDay:usr.BirthDay,
            MobileNo: usr.MobileNo,
            password: usr.password,
            WorkEnvironment:usr.WorkEnvironment,
            position:usr.position
          }
          records.push(usrsRecord);
        }
      });
      resp.json(records);
    } catch (error) {
      next(error);
    }
  });


// //    /* Get employee based on id*/
 router.get('/userfetch/:id', async (req, resp, next) => {

     try 
     { const usr = await User.findById(req.params.id);
  
     resp.json(
       {
        FirstName: usr.FirstName,
        LastName:usr.LastName,
        role: usr.role,
        email:usr.email,
        gender: usr.gender,
        BirthDay:usr.BirthDay,
        MobileNo: usr.MobileNo,
        password: usr.password,
        WorkEnvironment:usr.WorkEnvironment,
        position:usr.position
        }
       );
  
     } 
     catch (error) 
     {
       next(error);
     }
   });

  
//     /* Edit existing user based on id*/
     router.put('/usermodify/:id', async (req, resp, next) => {
  
         try 
         {   const requestBody = { FirstName: req.body.FirstName,
                                LastName: req.body.LastName, 
                                role: req.body.role,
                                email: req.body.email,
                                MobileNo: req.body.MobileNo,
                                password: req.body.password,
                                WorkEnvironment: req.body.WorkEnvironment,
                                position: req.body.positions
            };
  
             let usr_rec = await User.findById(req.params.id);
  
             if (!usr_rec)
             return res.status(404).json({ msg: 'User record not found' });
  
             const updatedUsr = await User.findByIdAndUpdate(
             req.params.id, requestBody, { new: true });
  
             resp.json(updatedUsr);
         } 
         catch (error) 
         {
             next(error);
        }
     });
  
//     /* Delete user based on id*/
     router.delete('/deleteuser/:id', async (req, resp, next) => 
     {
        try 
         {
             const usr = await User.findByIdAndDelete(req.params.id);
             resp.send(`User ${usr.FIrstName} record deleted!`)
         } 
         catch (error) 
         {
             next(error);
         }
     });

//Sign in user
     router.post('/signin', async (req, res, next) => 
        {
            const { email, password } = req.body;
    
        try {
                   
            const user = await User.findOne({ email });
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            if (user.email !== email || user.password !== password) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            res.status(200).json({ message: 'Sign-in successful', user });

            } 
        
        catch (error) 
        {
            console.error('Error:', error);
            next(error);
        }
        });
            
            
export default router;