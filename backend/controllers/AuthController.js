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



//register shop owner
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



// Login user or shop owner
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
                const token = JWT.sign({ _id: user._id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "7d" });
                return res.status(200).send({
                    success: true,
                    message: "User login successful",
                    token,
                    role: "user",
                });
            }
        }

        // Check in shops table
        let shop = await shopModel.findOne({ email });
        if (shop) {
            const match = await comparePassword(password, shop.password);
            if (match) {
                const token = JWT.sign({ _id: shop._id, role: "shopOwner" }, process.env.JWT_SECRET, { expiresIn: "7d" });
                return res.status(200).send({
                    success: true,
                    message: "Shop login successful",
                    token,
                    role: "shopOwner",
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


  //test controller
export const testcontroller = (req,res) => {
    res.send("Protected route");
}



















// //seperate user login
// export const userLoginController = async (req,res) => {
//     try{
//         const {email,password} = req.body
//         //validation
//         if(!email || !password){
//             return res.status(404).send({
//                 success:false,
//                 message:"Invalid email or password"
//             })    
//         }
//         //check user
//         const user = await userModel.findOne({email})
//         if(!user){
//             return res.status(404).send({
//                 success:false,
//                 message:'Email is not registered'
//             })
//         }
//     const match = await comparePassword(password,user.password)
//     if(!match){
//         return res.status(200).send({
//             success:false,
//             message:"Invalid password"
//         })
//     }

//     //token
//     const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET,{
//         expiresIn: "7d",
//     });
//     res.status(200).send({
//         success: true,
//         message:"login successfully",
//         user: {
//             fullname: user.fullname,
//             email: user.email,
//             dob: user.dob,
//             phone: user.phone,
//             resaddress: user.resaddress,
//             shoppingpreference: user.shoppingpreference
//         },
//         token,
//     });
//     }catch(error){
//             console.log(error)
//             res.status(500).send({
//                 success:false,
//                 message:'Error in login',
//                 error
//             })
//         }
// };



// //seperate shops login
// export const shopController = async (req,res) => {
//     try{
//         const {email,password} = req.body
//         //validation
//         if(!email || !password){
//             return res.status(404).send({
//                 success:false,
//                 message:"Invalid email or password"
//             })    
//         }
//         //check user
//         const shop = await shopModel.findOne({email})
//         if(!shop){
//             return res.status(404).send({
//                 success:false,
//                 message:'Email is not registered'
//             })
//         }
//     const match = await comparePassword(password,shop.password)
//     if(!match){
//         return res.status(200).send({
//             success:false,
//             message:"Invalid password"
//         })
//     }

//     //token
//     const token = await JWT.sign({_id: shop._id}, process.env.JWT_SECRET,{
//         expiresIn: "7d",
//     });
//     res.status(200).send({
//         success: true,
//         message:"login successfully",
//         shop: {
//             fullname: shop.fullname,
//             owneremail: shop.owneremail,
//             contact: shop.contact,
//             nic: shop.nic,
//             businessregno: shop.businessregno,
//             taxidno: shop.taxidno,
//             shopname: shop.shopname,
//             email: shop.email,
//             businesstype: shop.businesstype,
//             category: shop.category,
//             description: shop.description,
//             operatinghrs_from: shop.operatinghrs_from,
//             operatinghrs_to: shop.operatinghrs_to,
//             shoplocation: shop.shoplocation,
//             businessaddress: shop.businessaddress,
//             shopcontact: shop.shopcontact
//         },
//         token,
//     });
//     }catch(error){
//             console.log(error)
//             res.status(500).send({
//                 success:false,
//                 message:'Error in login',
//                 error
//             })
//         }
// };