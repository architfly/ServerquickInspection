const express = require('express');
const router = express.Router();
const ReportInside = require('../controler/Report_inside');
const isAuthenticated = require('../middleware/isAuth_middleware');

//Api to store the data of component and issue type
router.post('/stotecomponent', isAuthenticated  , ReportInside.HandleStorage);


// Api to retrive the data of component and issue type
router.get('/getcomponent', isAuthenticated, ReportInside.HandleRetriveReportInsidedata);


//*************** Api for ************
// router.get('/getalldata' , isAuthenticated , ReportInside.HandleAllComponentData); 
router.get('/getalldata'  , ReportInside.HandleAllComponentData); 


//Api for getting  the data of component and issue type

router.get('/componentdata' , isAuthenticated , ReportInside.HandleallComponentName); 

// APi to delete  the data of component and issue type
router.delete('/deletecomponent' , isAuthenticated , ReportInside.HandleDeleteComponentData);


// Api to update the data of component 
router.put('/updatecomponent' , isAuthenticated ,  ReportInside.HandlecomponentUpdate);



//Api to extract data of perticuar  component
router.get('/getsingleCompdata' , isAuthenticated , ReportInside.HandlesingleComoponentData);


// Api to store the data of site details 
// router.post('/storeSiteData' , isAuthenticated , ReportInside.HandleStoreSiteDetail);
router.post('/storeSiteData'  , ReportInside.HandleStoreSiteDetail);

// api to get the data of site details
// router.post('/getsitedata' , isAuthenticated , ReportInside.HandleDisplaySiteDetail);
router.get('/getsitedata'   , isAuthenticated , ReportInside.HandleDisplaySiteDetail);

// api to get the kml data
router.get('/getkml'  , isAuthenticated , ReportInside.HandleGetKml);

// api to store the data of opacity 
router.post('/storeopacity' , isAuthenticated  , ReportInside.HandleStoreOpacity);


// api to retrive the data of opacity 
router.get('/getopacity' , isAuthenticated  , ReportInside.HandleGetOpacity);









module.exports = router;
