const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuth_middleware');
const TagImage = require('../controler/Tag_image_Controler');

// API to store data of tag group
router.post('/storegroup', isAuthenticated, TagImage.HandleCreateGroup);


//Api to store tags 
router.post('/storetag' , isAuthenticated , TagImage.HandleAddIssue);

// Api to get  all tags
router.get('/getalltags', isAuthenticated, TagImage.HandleAllTagdata);

//Api to Add tags with perticular image array
router.post('/addtagwithimage', isAuthenticated, TagImage.HanadleTagStore);

// Api to unassign the tags of Array of immmage 
router.post('/unassign'  , isAuthenticated  , TagImage.HandleRemoveTags);

router.get('/allimagescred' , isAuthenticated  , TagImage.HandleShowAllImages);



// route to delete the Group in tag image
router.delete('/deleteGroup' , isAuthenticated  , TagImage.HandleDeleteTagGroup);

// route ****************** to delete perticular tag **********************
router.delete('/deleteTag'  , isAuthenticated , TagImage.HandleDeleteTag);


module.exports = router;
