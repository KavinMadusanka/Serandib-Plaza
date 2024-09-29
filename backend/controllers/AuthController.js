import { comparePassword, hashPassword } from "../helpers/AuthHelper.js";
import shopModel from "../models/shopModel.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken"

//register user
export const userRegisterController = async(req,res) => {
    try{
        const {fullname,
               email,
               dob,
               phone,
               address,
               shoppingPreference,
               password
            } = req.body

    //validation
    if (!fullname) {
        return res.send({ message: "Full name name is Required" });
    }
    if (!email) {
        return res.send({ message: "Email is Required" });
    }
    if (!dob) {
        return res.send({ message: "DOB is Required" });
    }
    if (!phone) {
        return res.send({ message: "Phone Number is Required" });
    }
    if (!address) {
        return res.send({ message: "Residential Address is Required" });
    }
    if (!password) {
        return res.send({ message: "Password is Required" });
    }
    //check user
    const existingUser = await userModel.findOne({email})

    //existing user
    if(existingUser){
        return res.status(200).send({
            success:false,
            message:'Already Registered customer,Please login'
        })
    }

    //register user
    const hashedPassword = await hashPassword(password)
    //save
    const user = await new userModel({
        fullname,
        email,
        dob,
        phone,
        address,
        shoppingPreference,
        password:hashedPassword
    }).save()

    res.status(201).send({
        success: true,
        message: "User Register Successfully",
        user,
    })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
};

//update user profile
export const updateUserProfileController = async (req, res) => {
    try {
      const { fullname, email, dob, phone, address, password } = req.body;
      const user = await userModel.findById(req.user._id);
  
      // Validate password length
      if (password && password.length < 8) {
        return res.json({ error: "Password is required and must be at least 8 characters long" });
      }
  
      // Hash the new password if provided
      const hashedPassword = password ? await hashPassword(password) : undefined;
  
      // Update user details
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          fullname: fullname || user.fullname,
          email: email || user.email,
          dob: dob || user.dob,
          phone: phone || user.phone,
          address: address || user.address,
          password: hashedPassword || user.password,
        },
        { new: true }
      );
  
      res.status(200).send({
        success: true,
        message: "Profile updated successfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error while updating data",
        error,
      });
    }
  };
  

//register shop 
export const shopRegisterController = async(req,res) => {
    try{
        const {fullname,
               owner_email,
               owner_contact,
               password,
               nic,
               businessregno,
               tax_id_no,
               shopname,
               email,
               businesstype,
               category,
               description,
               operating_hrs_from,
               operating_hrs_to,
               shoplocation,
               shopcontact
            } = req.body

        //validation
    if (!fullname) {
        return res.send({ message: "Shop Owner full name is Required" });
    }
    if (!owner_email) {
        return res.send({ message: "Shop Owner email is Required" });
    }
    if (!owner_contact) {
        return res.send({ message: "Shop Owner contact number is Required" });
    }
    if (!password) {
        return res.send({ message: "Password is Required" });
    }
    if (!nic) {
        return res.send({ message: "Shop Owner NIC is Required" });
    }
    if (!businessregno) {
        return res.send({ message: "Business Registration number is Required" });
    }
    if (!tax_id_no) {
        return res.send({ message: "Taxi Identification number is Required" });
    }
    if (!shopname) {
        return res.send({ message: "Shop name is Required" });
    }
    if (!email) {
        return res.send({ message: "Shop email address is Required" });
    }
    if (!businesstype) {
        return res.send({ message: "Business type is Required" });
    }
    if (!category) {
        return res.send({ message: "Business category is Required" });
    }
    if (!description) {
        return res.send({ message: "Shop description is Required" });
    }
    if (!operating_hrs_from) {
        return res.send({ message: "Shop start time is Required" });
    }
    if (!operating_hrs_to) {
        return res.send({ message: "Shop close time is Required" });
    }
    if (!shoplocation) {
        return res.send({ message: "Shop location(floor no) is Required" });
    }
    if (!shopcontact) {
        return res.send({ message: "Shop contact number is Required" });
    }
    //check user
    const existingShop = await shopModel.findOne({email})

    //existing user
    if(existingShop){
        return res.status(200).send({
            success:true,
            message:'Already Registered shop,Please login'
        })
    }

    //register shop
    const hashedPassword = await hashPassword(password)
    //save
    const shop = await new shopModel({
        fullname,
        owner_email,
        owner_contact,
        password:hashedPassword,
        nic,
        businessregno,
        tax_id_no,
        shopname,
        email,
        businesstype,
        category,
        description,
        operating_hrs_from,
        operating_hrs_to,
        shoplocation,
        shopcontact
    }).save()

    res.status(201).send({
        success: true,
        message: "Successfully registered shop",
        shop,
    })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
}


// Login user, shop owner, or admin
export const userLoginController = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
          return res.status(400).send({ success: false, message: "Email and password are required" });
      }

      // Check in users table (for both user and admin)
      let user = await userModel.findOne({ email });
      if (user) {
          const match = await comparePassword(password, user.password);
          if (match) {
              const role = user.role; // 1 = Admin, 0 = User
              const token = JWT.sign({ _id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
              return res.status(200).send({
                  success: true,
                  message: "Login successful",
                  token,
                  role,
                  user, // Return user details
              });
          }
      }

      // Check in shops table (for shop owner)
      let shop = await shopModel.findOne({ email });
      if (shop) {
          const match = await comparePassword(password, shop.password);
          if (match) {
              const token = JWT.sign({ _id: shop._id, role: 2 }, process.env.JWT_SECRET, { expiresIn: "7d" });  // 2 = Shop Owner
              return res.status(200).send({
                  success: true,
                  message: "Shop owner login successful",
                  token,
                  role: 2,  // Shop owner role
                  shop, // Return shop details
              });
          }
      }

      // If no match found in either table
      return res.status(400).send({
          success: false,
          message: "Invalid email or password",
      });

  } catch (error) {
      console.error(error);
      return res.status(500).send({ success: false, message: "Error during login", error });
  }
};



//update shop details
  export const updateShopProfileController = async (req, res) => {
    try {
      const {
        fullname,
        owner_email,
        owner_contact,
        password,
        nic,
        businessregno,
        tax_id_no,
        shopname,
        email,
        businesstype,
        category,
        description,
        operating_hrs_from,
        operating_hrs_to,
        shoplocation,
        shopcontact,
      } = req.body;
  
      // Find the shop by the owner's ID
      const shop = await shopModel.findById(req.user._id);
  
      // Validate password length
      if (password && password.length < 8) {
        return res.json({ error: "Password is required and must be at least 8 characters long" });
      }
  
      // Hash the new password if provided
      const hashedPassword = password ? await hashPassword(password) : undefined;
  
      // Update shop details
      const updatedShop = await shopModel.findByIdAndUpdate(
        req.user._id,
        {
          fullname: fullname || shop.fullname,
          owner_email: owner_email || shop.owner_email,
          owner_contact: owner_contact || shop.owner_contact,
          password: hashedPassword || shop.password,
          nic: nic || shop.nic,
          businessregno: businessregno || shop.businessregno,
          tax_id_no: tax_id_no || shop.tax_id_no,
          shopname: shopname || shop.shopname,
          email: email || shop.email,
          businesstype: businesstype || shop.businesstype,
          category: category || shop.category,
          description: description || shop.description,
          operating_hrs_from: operating_hrs_from || shop.operating_hrs_from,
          operating_hrs_to: operating_hrs_to || shop.operating_hrs_to,
          shoplocation: shoplocation || shop.shoplocation,
          shopcontact: shopcontact || shop.shopcontact,
        },
        { new: true }
      );
  
      res.status(200).send({
        success: true,
        message: "Profile updated successfully",
        updatedShop,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error while updating data",
        error,
      });
    }
  };
  

//get all shops
 export const getAllShopsController = async (req, res) => {
    try {
        const shops = await shopModel.find(); // Fetch all shops from the database
        res.status(200).send({
            success: true,
            shops,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error fetching shops',
            error,
        });
    }
};


export const getAllUsersController = async (req, res) => {
    try {
      const users = await userModel.find(); // Fetch all users from the database
      res.status(200).send({
        success: true,
        users,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: 'Error fetching users',
        error,
      });
    }
  };


//test controller
export const testcontroller = (req,res) => {
    res.send("Protected route");
}


//delete user profile
export const deleteUserProfileController = async (req, res) => {
    try {
  
      // Check if user exists
      const user = await userModel.findById(req.user._id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
  
      // Delete the user
      await userModel.findByIdAndDelete(user._id);
  
      // Optionally, perform any additional cleanup or related actions here
  
      res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete user",
        error: error.message,
      });
    }
  };
  



  //delete shop profile
export const deleteShopProfileController = async (req, res) => {
    try {
      
      // Check if user exists
      const user = await shopModel.findById(req.user._id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Shop not found" });
      }
  
      // Delete the user
      await shopModel.findByIdAndDelete(user._id);
  
      res
        .status(200)
        .json({ success: true, message: "Shop deleted successfully" });
    } catch (error) {
      console.error("Error deleting shop:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete shop",
        error: error.message,
      });
    }
  };
  

  export const forgotPasswordController = async (req, res) => {
    try {
      const { email, newPassword, re_Password } = req.body;
  
      // Validate input fields
      if (!email) {
        return res.status(400).send({ message: 'Email is required' });
      }
      if (!newPassword) {
        return res.status(400).send({ message: 'New password is required' });
      }
      if (!re_Password) {
        return res.status(400).send({ message: 'Please confirm your new password' });
      }
      if (newPassword !== re_Password) {
        return res.status(400).send({ message: 'Passwords do not match' });
      }
  
      // Check if the user exists
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User with this email does not exist",
        });
      }
  
      // Hash the new password
      const hashedPassword = await hashPassword(newPassword);
  
      // Update the user's password
      await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
  
      return res.status(200).send({
        success: true,
        message: "Password reset successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: 'Something went wrong',
        error: error.message,  // More descriptive error message
      });
    }
  };
  

  // Controller to get total user and shop count
export const getTotalUserCountController = async (req, res) => {
  try {
      // Get the total count of users
      const userCount = await userModel.countDocuments();

      res.status(200).send({
          success: true,
          message: "Total user counts fetched successfully",
          data: {
              totalUsers: userCount,
          }
      });
  } catch (error) {
      console.log(error);
      res.status(500).send({
          success: false,
          message: "Error fetching total counts",
          error: error.message,
      });
  }
};

// Controller to get total user and shop count
export const getTotalShopCountController = async (req, res) => {
  try {
      // Get the total count of shops
      const shopCount = await shopModel.countDocuments();

      res.status(200).send({
          success: true,
          message: "Total shop count fetched successfully",
          data: {
              totalShops: shopCount,
          }
      });
  } catch (error) {
      console.log(error);
      res.status(500).send({
          success: false,
          message: "Error fetching total counts",
          error: error.message,
      });
  }
};
