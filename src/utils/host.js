
require("dotenv").config()

const PORT=process.env.PORT || 3000
exports.HOST=`http://localhost:${PORT}/api/v1/payment`
