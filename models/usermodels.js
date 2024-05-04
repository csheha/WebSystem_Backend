import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

FirstName:
  {     type: String,
        required: true },
LastName:
  {     type: String,
        required: true },
role: 
  {     type: String,
        required: true },
email:
  {     type: String,
        required: true },
gender:
  {     type: String,
        required: true },
BirthDay:
  {     type: String,  },  
MobileNo: 
  {     type: String,
        required: true },
password: 
  {     type: String,
        required: true },
WorkEnvironment:
  {
        type: String,
  },
position:
  {
        type:String
  }
    
});

const User = mongoose.model('User', UserSchema);

export default User;