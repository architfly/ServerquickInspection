const TagImage = require('../models/tagimage/tagimage');
const Report = require('../models/reports/reports');
const ImageProcessed = require('../models/imageProcessed/imageProcessed');


module.exports.HandleCreateGroup = async (req, res) => {
    const { taggroup } = req.body;
    const reportId = req.headers['x-report-id'];
    if (!reportId) {
        return res.status(403).json({ message: "Header 'x-report-id' is required" });
    }
    if (!taggroup || taggroup.trim() === '') {
        return res.status(402).json({ message: "Please provide a valid tag group name" });
    }
    try {
        let group = await TagImage.findOne({ reportid: reportId });
        if (group) {
            group.maintag.push({ taggroup });
            await group.save();
            return res.status(200).json({
                message: "Tag Group Added Successfully",
                data: group
            });
        }
        const response = await TagImage.create({
            reportid: reportId,
            maintag: [{ taggroup }]
        });
        return res.status(200).json({
            message: "New Tag Group Created",
            data: response
        });
    } catch (error) {
        console.error("Error creating tag group:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



// Api to store the data of tags 
module.exports.HandleAddIssue = async (req, res) => {
    const { tags } = req.body;
    if (!Array.isArray(tags) || tags.length === 0) {
        return res.status(403).json({
            message: "Please Enter Valid Fields"
        });
    }
    const reportId = req.headers['x-report-id'];
    const groupId = req.headers['x-group-id'];
    const tagImageId = req.headers['x-tagimage-id'];
    // console.log(tagImageId)
    // console.log(groupId)
    if (!reportId || !groupId || !tagImageId) {
        return res.status(403).json({
            message: "Some Required Fields Are Not Coming"
        });
    }
    try {
        // Find the TagImage document by its ID
        const tagImage = await TagImage.findById(tagImageId);
        if (!tagImage) {
            return res.status(402).json({
                message: "Tag Image Not Found"
            });
        }
        // Find the specific group within the maintag array
        const maingroup = tagImage.maintag.find(item => item._id.toString() === groupId);
        if (!maingroup) {
            return res.status(403).json({
                message: "No Group Found"
            });
        }
        maingroup.tags.push(...tags);
        await tagImage.save();
        return res.status(200).json({
            message: "Tags Added Successfully",
            data: tagImage
        });
    } catch (error) {
        console.error("Error adding tags:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};


// Api to get the data of Perticular report
module.exports.HandleAllTagdata = async (req, res) => {
    // console.log(req.headers['x-tagimage-id']);
    const reportid = req.headers['x-report-id'];
    if (!reportid) {
        return res.status(403).json({
            message: "Tag Image not found"
        })
    }
    try {
        const response = await TagImage.find({ reportid: reportid });
        if (!response) {
            return res.status(403).json({
                message: "No Data Found"
            })
        }
        return res.status(200).json({
            message: "Data Retrieved Successfully",
            data: response
        })
    } catch (error) {
        return res.status(403).json({
            message: "No Data Found"
        })
    }
}




// Api to store tag data 
module.exports.HanadleTagStore = async (req, res) => {
    // Check if 'x-report-id' header is present
    console.log(`The data from UI for tag and image id is ${req.body}`)
    if (!req.headers['x-report-id']) {
        return res.status(403).json({
            message: "Report Id is Required"
        });
    }

    const { imageid, tags } = req.body;
    if (!Array.isArray(imageid) || !Array.isArray(tags) || imageid.length === 0 || tags.length === 0) {
        return res.status(401).json({
            message: "Please Enter valid Data"
        });
    }

    try {
        const response = await Promise.all(
            imageid.map(async (id) =>
                ImageProcessed.findByIdAndUpdate(
                    id,
                    { $set: { tags: tags } },
                    { new: true }
                )
            )
        );

        if (response.some(item => !item)) {
            return res.status(404).json({
                message: "Some Images Not Found"
            });
        }

        return res.status(200).json({
            message: "Tag Data Stored Successfully",
            data: response
        });

    } catch (error) {
        console.error("Error Found:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};



 

module.exports.HandleRemoveTags = async (req, res) => {
  
    console.log(`The data from UI for tag removal and image id is ${req.body}`);
    
    if (!req.headers['x-report-id']) {
        return res.status(403).json({
            message: "Report Id is Required"
        });
    }

    const { imageid, tags } = req.body;
    if (!Array.isArray(imageid) || !Array.isArray(tags) || imageid.length === 0 || tags.length === 0) {
        return res.status(401).json({
            message: "Please Enter valid Data"
        });
    }

    try {
        const response = await Promise.all(
            imageid.map(async (id) =>
                ImageProcessed.findByIdAndUpdate(
                    id,
                    { $pull: { tags: { $in: tags } } },  // Remove specific tags from the 'tags' array
                    { new: true }
                )
            )
        );

        if (response.some(item => !item)) {
            return res.status(404).json({
                message: "Some Images Not Found"
            });
        }

        return res.status(200).json({
            message: "Tags Removed Successfully",
            data: response
        });

    } catch (error) {
        console.error("Error Found:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};




// api used in tag image to show images in map
module.exports.HandleShowAllImages = async(req , res)=>{
    const reportid = req.headers['x-report-id'];
    if(!reportid) return res.status(403).json({message:"No Image Id"})
    try {
        const response = await ImageProcessed.find({reportid : reportid}).select("latitude longitude imagelink");
        if(!response ) return res.status(404).json({message:"No Image Found"})
        return res.status(200).json({
         message: "Images Retrieved Successfully",
         data: response
        })
        
    } catch (error) {
        return res.status(404).json({
            message: "Internal Server Error"
        })
    }
}






// Api to delete the tag's group 
module.exports.HandleDeleteTagGroup = async (req, res) => {
    const groupId = req.body.groupid;
    const mainId = req.body.mainid;

    if (!groupId || !mainId) {
        return res.status(403).json({
            message: "No group Id or x-tag-main-id provided"
        });
    }

    try {
        const tagImage = await TagImage.findById(mainId);
        
        if (!tagImage) {
            return res.status(404).json({ message: "TagImage not found" });
        }

        // Remove the entire tag group with matching groupId
        tagImage.maintag = tagImage.maintag.filter(tagGroup => tagGroup._id.toString() !== groupId);
        
        await tagImage.save();

        return res.status(200).json({
            message: "Group ID deleted successfully",
            updatedTagImage: tagImage
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};




// Api to delete perticular tags in group 



 


module.exports.HandleDeleteTag = async (req, res) => {
    const groupId = req.body.groupid;
    const mainId = req.body.mainid;
    const indexToRemove = req.body.tagindex;
    console.log(groupId , mainId)
    if (!groupId || !mainId || indexToRemove === undefined) {
        return res.status(403).json({
            message: "No group Id or x-tag-main-id provided"
        });
    }

    try {
        const tagImage = await TagImage.findById(mainId);
        
        if (!tagImage) {
            return res.status(404).json({ message: "TagImage not found" });
        }

        if (Array.isArray(tagImage.maintag)) {
            console.log("Maintag array:", tagImage.maintag);
            const group = tagImage.maintag.find(g => String(g._id) === String(groupId));
            
            if (!group) {
                console.log("Group not found for ID:", groupId);
                return res.status(404).json({ message: "Group not found" });
            }
            
            if (Array.isArray(group.tags) && typeof indexToRemove === 'number' && indexToRemove >= 0 && indexToRemove < group.tags.length) {
                console.log("Before deletion, tags:", group.tags);
                group.tags.splice(indexToRemove, 1);
                console.log("After deletion, tags:", group.tags);
                await tagImage.save();
                return res.status(200).json({
                    message: "Tag deleted successfully",
                    updatedTagImage: tagImage
                });
            } else {
                return res.status(400).json({ message: "Invalid tag index" });
            }
        } else {
            return res.status(400).json({ message: "Maintag is not an array" });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};






// Api to store the url of base64 of croped image 