const express = require("express");

const memberController = require("../../controllers/memberController");

const router = express.Router();

router.get("/:memberId", memberController.getOneMember);

module.exports =  router;
