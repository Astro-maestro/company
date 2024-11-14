const express = require('express');
const DashboardController = require('../../conreoller/admin/dashboard/DashboardController');
const authCheck = require('../../middleware/auth');
const router = express.Router();

router.get('/',authCheck,DashboardController.dashboardView);

module.exports = router;