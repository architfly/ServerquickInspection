const jwt = require('jsonwebtoken')
const User = require('../models/user/user')
const Company = require('../models/company/company');
const ReportInside = require('../models/report_inside/report_inside_comp');

 

// module.exports.HandleSignup = async(req , res)=>{
//     try {
//         if(String(req.body.password) !== String(req.body.confirmpassword)){
           
           
//             return res.status(400).json({
//                 message:'Password dosent match'
//             });
//         }
//         const EmailCheck = await User.findOne({ email: req.body.email });
//         if (EmailCheck) {      
//             return  res.status(400).json({
//                 message: 'Email already exists'
//             })

//         }
//         const company = await Company.findOne({
//             company_name:req.body.company
//         })
//         if(!company){
//             const companycreation = await Company.create({
//                 company_name:req.body.company,
//                 createdBy:req.body.name
//             }) 
//             if(!companycreation){
//                 return res.status(400).json({
//                     message:'Company creation failed'
//                 })
//             }
//             res.json({
//                 message:'Company created successfully'
//             })
//         }else{
//             return res.status(400).json({
//                 message:'Company already exists contact your company Admin'
//             })
//         }

//         const user1 = await User.create({
//             name:req.body.name,
//             email:req.body.email,
//             password:req.body.password
//         })
//         if(!user1){
//             return res.status(400).json({
//                 message:'unable to create the user'
//             })
//         }
//     }catch (error) {
//         console.log(`**********************error in creation ************************${error}`);
//         return res.send(error); 
        
//     }
// }

 

module.exports.HandleSignup = async (req, res) => {
    try {
        if (String(req.body.password) !== String(req.body.confirmpassword)) {
            return res.status(400).json({
                message: 'Password does not match',
            });
        }

        const emailCheck = await User.findOne({ email: req.body.email });
        if (emailCheck) {
            return res.status(400).json({
                message: 'Email already exists',
            });
        }

        let company = await Company.findOne({ company_name: req.body.company });

        if (!company) {
            company = await Company.create({
                company_name: req.body.company,
                createdBy: req.body.name
            });

            if (!company) {
                return res.status(400).json({
                    message: 'Company creation failed',
                });
            }

            console.log('Company created successfully');
        }

        const user1 = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            company_name: company._id
        });

        if (!user1) {
            return res.status(400).json({
                message: 'Unable to create the user',
            });
        }

        // Prepare the ReportInside data to insert
        const reportInsideData = [
            {
                company: company._id,
                issuetype: [
                    "Vegetation", "Damage", "Debris", "Erosion", "Broken", "Contamination", 
                    "Deformed", "Rust", "Loose", "Missing", "Rotten", "Cracked", "Chipped", 
                    "Clogged", "Leaked", "Mold", "Lightning strike", "Flooding", 
                    "Discolouration / Fade / Staining", "Hot Spot"
                ],
                inspaction: {
                    inspactionname: "Solar Panel",
                    componentname: [
                        "Cell", "Combiner Box", "Diode", "Glass", "Inverter", "Junction Box", 
                        "Module", "Row", "String", "Table", "Tracker"
                    ]
                }
            },
            {
                company: company._id,
                issuetype: [
                    "Vegetation", "Damage", "Debris", "Erosion", "Broken", "Contamination",
                    "Deformed", "Rust", "Loose", "Missing", "Rotten", "Cracked", "Mole",
                    "Leaked", "Clogged", "Cavities", "Flooding", "Fading", "Fouling"
                ],
                inspaction: {
                    inspactionname: "Building",
                    componentname: [
                        "Cladding", "Door", "Electrical", "Flashing", "Facade", "Foundation",
                        "Grout", "Gutter", "Paint", "Plumbing", "Roof", "Stair", "Weather Protection",
                        "Window"
                    ]
                }
            },
            {
                company: company._id,
                issuetype: [
                    "Vegetation", "Damage", "Debris", "Erosion", "Broken", "Contamination",
                    "Deformed", "Rust", "Loose", "Missing", "Rotten", "Cracked", "Chipped", 
                    "Point of Interest", "Clogged", "Leak", "Mold", "Thermal Issue", "Other Issue", 
                    "Split", "Flashed", "Cavities", "Obstruction", "Flooding", "Corrosion", 
                    "Lightning strike", "Delamination", "Fading", "Fouling", "Chalking", "Mud Cracking", 
                    "Pinholing", "Paint Spillage", "Wear and tear", "Blister / Bubble / Crack / Flaking", 
                    "Chip / Scratch", "Discolouration / Fade / Staining", "Guano", "Marine growth", "Shading"
                ],
                inspaction: {
                    inspactionname: "Wind Turbine",
                    componentname: [
                        "Blade", "Blade/LPS", "Blade/VG", "Nacelle", "Tower"
                    ]
                }
            },
            {
                company: company._id,
                issuetype: [
                    "Vegetation", "Damage", "Debris", "Erosion", "Broken", "Contamination",
                    "Deformed", "Rust", "Loose", "Missing", "Rotten", "Cracked", "Chipped", 
                    "Point of Interest", "Clogged", "Leak", "Mold", "Thermal Issue", "Other Issue", 
                    "Split", "Flashed", "Cavities", "Obstruction", "Flooding", "Corrosion", 
                    "Lightning strike", "Delamination", "Fading", "Fouling", "Chalking", "Mud Cracking", 
                    "Pinholing", "Paint Spillage", "Wear and tear", "Blister / Bubble / Crack / Flaking", 
                    "Chip / Scratch", "Discolouration / Fade / Staining", "Guano", "Marine growth", "Shading"
                ],
                inspaction: {
                    inspactionname: "Infrastructure",
                    componentname: [
                        "Pavement(roads)", "Tunnels", "Rail Tracks", "Drainage Systems", "Water Treatment Plant"
                    ]
                }
            },
            {
                company: company._id,
                issuetype: [
                    "Vegetation", "Damage", "Debris", "Erosion", "Broken", "Contamination",
                    "Deformed", "Rust", "Loose", "Missing", "Rotten", "Cracked", "Chipped", 
                    "Clogged", "Leaked", "Mold", "Lightning strike", "Flashed", "Flooding", 
                    "Discolouration / Fade / Staining", "Staining, Guano", "Marine growth", "Shading", 
                    "Mud Cracking", "Fouling"
                ],
                inspaction: {
                    inspactionname: "Bridge",
                    componentname: [
                        "Deck", "Superstructure", "Substructure", "Expansion Joints", "Bearings", 
                        "Cables", "Parapets/Guardrails", "Approach Slabs", "Drains", "Wingwalls", 
                        "Utilities", "Fenders", "Lighting/Signals", "Pedestrian Walkways", "Railings/Barriers", 
                        "Anchorage (for suspension bridges)"
                    ]
                }
            },
            {
                company: company._id,
                issuetype: [
                    "Vegetation", "Damage", "Debris", "Erosion", "Broken", "Contamination",
                    "Deformed", "Rust", "Loose", "Missing", "Rotten", "Cracked", "Chipped", 
                    "Clogged", "Leaked", "Mold", "Lightning strike", "Flashed", "Flooding", 
                    "Discolouration / Fade / Staining", "Guano", "Marine growth", "Shading", 
                    "Other Issue", "Fading", "Fouling", "Delamination", "Chip / Scratch", 
                    "Pinholing", "Obstruction", "Mud Cracking", "Blister / Bubble / Crack / Flaking"
                ],
                inspaction: {
                    inspactionname: "Cell Tower",
                    componentname: [
                        "Antenna", "Base Transceiver Station (BTS)", "Tower Structure", "Radios", 
                        "Cables (Coaxial and Fiber)", "Grounding System", "Power Supply Unit", 
                        "Backup Generator", "Shelter/Cabinet", "Microwave Dish/Link", 
                        "Lightning Rods/Protection Systems", "Remote Radio Head (RRH)", "Feeder Cable", 
                        "Alarm System", "Grounding Rods", "Monopole/Pole"
                    ]
                }
            },
            {
                company: company._id,
                issuetype: [
                    "Vegetation", "Damage", "Debris", "Erosion", "Broken", "Contamination",
                    "Deformed", "Rust", "Loose", "Missing", "Rotten", "Cracked", "Chipped", 
                    "Point of Interest", "Clogged", "Leak", "Mold", "Thermal Issue", "Other Issue", 
                    "Split", "Flashed", "Cavities", "Obstruction", "Flooding", "Corrosion", 
                    "Lightning strike", "Delamination", "Fading", "Fouling", "Chalking", 
                    "Mud Cracking", "Pinholing", "Paint Spillage", "Wear and tear", 
                    "Blister / Bubble / Crack / Flaking", "Chip / Scratch", "Discolouration / Fade / Staining", 
                    "Guano", "Marine growth", "Shading"
                ],
                inspaction: {
                    inspactionname: "District Heating",
                    componentname: [
                        "Boilers (gas, biomass, or waste)", "Heat Exchangers", "Combined Heat and Power (CHP) Units", 
                        "Geothermal Wells", "Heat Pumps", "Pipelines", "Insulation on Pipes", 
                        "Valves (isolation, control)", "Heat Exchanger Stations", "Pumping Stations", 
                        "Heat Exchangers (for individual buildings)", "Metering Units (flow meters, heat meters)", 
                        "Control Units (thermostats, sensors)", "Filters (for water or steam systems)", 
                        "Pressure Regulators", "SCADA Systems (for monitoring performance)", "Temperature Sensors", 
                        "Flow Sensors", "Pressure Sensors", "Energy Meters", "Thermal Storage Tanks", 
                        "Accumulator Tanks", "Insulation for Storage Units", "Backup Boilers", 
                        "Electrical Backup Systems", "Emergency Shutoff Valves"
                    ]
                }
            },
            {
                company: company._id,
                issuetype: [
                    "Vegetation", "Damage", "Debris", "Erosion", "Broken", "Contamination",
                    "Deformed", "Rust", "Loose", "Missing", "Rotten", "Cracked", "Chipped", 
                    "Clogged", "Leaked", "Mold", "Thermal Issue", "Other Issue", "Split", 
                    "Flashed", "Cavities", "Obstruction", "Flooding", "Corrosion", "Lightning strike", 
                    "Delamination", "Fading", "Fouling", "Chalking", "Mud Cracking", "Pinholing", 
                    "Paint Spillage", "Wear and tear", "Blister / Bubble / Crack / Flaking", "Chip / Scratch", 
                    "Discolouration / Fade / Staining", "Guano", "Marine growth", "Shading"
                ],
                inspaction: {
                    inspactionname: "Other",
                    componentname: ["Area"]
                }
            }
        ];

        // Create ReportInside records for each inspection
        const reportInsides = await ReportInside.insertMany(reportInsideData);

        if (!reportInsides) {
            return res.status(400).json({
                message: 'Failed to create reportInside data',
            });
        }

        return res.status(201).json({
            message: 'User, company, and report data created successfully',
            user: user1,
            company: company,
            reportInsides: reportInsides,
        });

    } catch (error) {
        console.error('********************** Error in creation ************************', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};








// module.exports.HandleSignup = async (req, res) => {
//     try {
       
//         if (String(req.body.password) !== String(req.body.confirmpassword)) {
//             return res.status(400).json({
//                 message: 'Password does not match',
//             });
//         }

       
//         const emailCheck = await User.findOne({ email: req.body.email });
//         if (emailCheck) {
//             return res.status(400).json({
//                 message: 'Email already exists',
//             });
//         }

//         let company = await Company.findOne({ company_name: req.body.company });

//         if (!company) {
//             company = await Company.create({
//                 company_name: req.body.company,
//                 createdBy: req.body.name
//             });

//             if (!company) {
//                 return res.status(400).json({
//                     message: 'Company creation failed',
//                 });
//             }

           
//             console.log('Company created successfully');
//         }
//         const user1 = await User.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password,
//             company_name: company._id
//         });

//         if (!user1) {
//             return res.status(400).json({
//                 message: 'Unable to create the user',
//             });
//         }

//         return res.status(201).json({
//             message: 'User and company created successfully',
//             user: user1,
//             company: company,
//         });

//     } catch (error) {
//         console.error('********************** Error in creation ************************', error);
//         return res.status(500).json({
//             message: 'Internal server error',
//             error: error.message,
//         });
//     }
// };








//SignIn Api
const privated = process.env.SECRET_KEY;

module.exports.HandleSignin = async (req, res) => {
    try {    
        console.log("This is body " ,req.body);
            
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }        
        if (user.password !== req.body.password) {
            return res.status(400).json({ message: 'Invalid password' });
        }        
        const token = jwt.sign({
            email: user.email,
            name: user.name,
            company_id:user.company_id
        },privated, { expiresIn: '1d' });
        // return res.status(200).json({ token });
        // console.log("************" , user.body.email);
        return res.json({status:200 , user:token , company_id:user.company_name})

    } catch (error) {
        console.log(`***************************error in Sign In**************************** ${error}`);
        return res.status(500).json({ message: 'Internal server error', error });
    }  
};








// ********  User Creation (User Management ) ***********

module.exports.HandleCreteUser = async(req , res)=>{
    console.log("req user is ",req.user);
    console.log(req.body);
    if (!req.body.name || !req.body.email || !req.body.password || !req.body.userRole ) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    const company = await Company.findOne({company_name: req.body.companyName});
    console.log(company.company_name)
    const response = await User.findOne({
        email: req.body.email,
        company_name:req.body.company_id
    })
    console.log("prining the data of useremail and company name",response);
    if(response){
        return res.status(400).json({ message: "Duplicate Data" });
    }  
    
    try {
        const response = await User.create({
            name:  req.body.name,
            email:  req.body.email,
            password: req.body.password,
            company_name: req.body.companyName,
            user_role: req.body.userRole,
            user_expiry_date: req.body.userExpiryDate,
            user_creted_by : req.user.name,
            company_name : company._id
        });
        if(!response){
            return res.status(400).json({message:'User not created'});
        } 
        return res.status(200).json({message:'user Created successfully '})
    } catch (error) {
        console.log('Error whele  creating user form management', error);
        return res.status(400).json({
            message: 'Internal Server Error',
        })   
        
    }
}

// module.exports.HandleCreteUser = async(req , res)=>{
//     res.status(200).json({
//         message: 'User Created successfully '
//     })
// }




module.exports.HandleUserList = async(req , res)=>{
    try {
        const response = await User.find({
           $and: [
            {company_name:req.headers['x-company-id']},
            // wher company name bhe add karna hai 
             ]
        });
        if(!response){
            return res.status(400).json({message:'No user found'});
        }
        return res.status(200).json({
            message:'User List',
            data: response
        })
        
    } catch (error) {
        console.log("**************the error in api of get list fo user *************" , error)
        return res.status(400).json({
            message:"Error in the api"
        })
    }
}



// Delete User from user list
module.exports.HandleDeleteUser = async(req , res )=>{
    const userid = req.headers['x-delete-userid'];
    console.log(userid);
    if(!userid) return res.status(403).json({message:"Improper Data"});

    try {
        const response = await User.findByIdAndDelete(userid);
        if(!response){
            return res.status(400).json({message:'User Not Deleted'});
        }
        return res.status(200).json({
            message:"User Deleted",
            data:response
        })
    } catch (error) {
        return res.status(404).json({
            message:"Internal Server Error"
        })
    }
}




module.exports.HandleUserName=async (req,res)=>{
    // if(!req.headers['x-user-id']) return res.status (402).json({message:"no user id found"})
    const token  = req.headers['x-auth-token'];
    
    try {
       
        const decoded = jwt.decode(token, { complete: true });
        console.log(`email  : ${decoded.payload.email}`)
        const response = await User.findOne({email : decoded.payload.email}).populate('company_name');
         
        if(!response){
            return res.status(400).json({message:'User Not Found'});
        } 
        return res.status(200).json({
           
            message:"User Name",
            name:response.name,
            email:response.email,
            companyName : response.company_name.company_name,
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({message:'Internal server error'});
    }
}






// Update password api 
 
module.exports.HandleUpdatePassword = async (req, res) => {
  const { email, password } = req.body; // Use req.body instead of req.query

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and Password are required.",
    });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
 
    user.password = password; 
    await user.save();

    return res.status(200).json({
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



 