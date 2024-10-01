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
  

  // Shop Registration Controller
  export const shopRegisterController = async (req, res) => {
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
  
      // If the request contains a file (image), convert it to binary
      const logo = {
        data: req.file.buffer, // Store the file buffer (binary data)
        contentType: req.file.mimetype, // Store the content type (e.g., 'image/png')
      };
  
      const hashedPassword = await hashPassword(password)

      // Create the shop object with all details and binary image
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
        shopcontact,
        logo, // Save the image data
      }).save();
  
      res.status(201).json({
        success: true,
        message: 'Shop registered successfully',
        shop,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Error in registration',
      });
    }
  };
  

//login for customer,user and admin  
export const userLoginController = async (req, res) => {
  
    try {
      const { email, password } = req.body;
  
      // Validate input
      if (!email || !password) {
        return res.status(400).send({ success: false, message: "Email and password are required" });
      }
  
      // Check in users table
      let user = await userModel.findOne({ email });
      if (user) {
        const match = await comparePassword(password, user.password);
        if (match) {
          const token = JWT.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
          return res.status(200).send({
            success: true,
            message: "Login successful",
            token,
            role: user.role,
            user,
          });
        }
      }
  
      // Check in shops table
      let shop = await shopModel.findOne({ email });
      if (shop) {
        const match = await comparePassword(password, shop.password);
        if (match) {
          const token = JWT.sign({ _id: shop._id, role: 2 }, process.env.JWT_SECRET, { expiresIn: "7d" });
          return res.status(200).send({
            success: true,
            message: "Shop owner login successful",
            token,
            role: 2,
            shop,
          });
        }
      }
  
      // If no match found
      return res.status(400).send({ success: false, message: "Invalid email or password" });
      
    } catch (error) {
      console.error("Login error:", error);
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


// Controller to get user growth over time
export const getUserGrowthController = async (req, res) => {
    try {
        // MongoDB aggregation pipeline to get user count per month
        const userGrowthData = await userModel.aggregate([
            {
                // Match users that have a createdAt timestamp
                $match: {
                    createdAt: { $exists: true }
                }
            },
            {
                // Group users by month and year
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" }
                    },
                    userCount: { $sum: 1 } // Count users for each group
                }
            },
            {
                // Sort by year and month
                $sort: { "_id.year": 1, "_id.month": 1 }
            },
            {
                // Format the month and year for frontend
                $project: {
                    _id: 0,
                    month: {
                        $concat: [
                            { $arrayElemAt: [["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], "$_id.month"] },
                            " ",
                            { $toString: "$_id.year" }
                        ]
                    },
                    userCount: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: userGrowthData
        });
    } catch (error) {
        console.error("Error fetching user growth data:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching user growth data",
            error: error.message
        });
    }
};


// Controller to get shop growth over time
export const getShopGrowthController = async (req, res) => {
    try {
        // MongoDB aggregation pipeline to get shop count per month
        const shopGrowthData = await shopModel.aggregate([
            {
                // Match shops that have a createdAt timestamp
                $match: {
                    createdAt: { $exists: true }
                }
            },
            {
                // Group shops by month and year
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" }
                    },
                    shopCount: { $sum: 1 } // Count shops for each group
                }
            },
            {
                // Sort by year and month
                $sort: { "_id.year": 1, "_id.month": 1 }
            },
            {
                // Format the month and year for frontend
                $project: {
                    _id: 0,
                    month: {
                        $concat: [
                            { $arrayElemAt: [["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], "$_id.month"] },
                            " ",
                            { $toString: "$_id.year" }
                        ]
                    },
                    shopCount: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: shopGrowthData
        });
    } catch (error) {
        console.error("Error fetching shop growth data:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching shop growth data",
            error: error.message
        });
    }
};


// Controller to get shop count by category
export const getShopCountByCategoryController = async (req, res) => {
    try {
        const categoryCounts = await shopModel.aggregate([
            {
                $group: {
                    _id: "$category", // Group by the category field
                    count: { $sum: 1 } // Count the number of shops in each category
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: categoryCounts
        });
    } catch (error) {
        console.error("Error fetching shop count by category:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching shop count by category",
            error: error.message
        });
    }
};


//get promotiom image
export const logoController = async(req,res) => {
    try{
        const shop = await shopModel.findById(req.params.pid).select("logo");
        if(shop.logo){
            res.set("Content-type",shop.logo.contentType);
            return res.status(200).send(shop.logo.data)
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting promotion image',
            error
        })
    }
}

