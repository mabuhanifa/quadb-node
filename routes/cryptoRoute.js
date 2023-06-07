const { getResponse, getCrypto } = require("../controller/cryptoController");

const router = require("express").Router();

router.get("/", getResponse);
router.get("/crypto", getCrypto);

module.exports = router;
