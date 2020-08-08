var express = require("express");
var app = express();
var port = 8080;
app.get("/", function (req, res) {
    res.send("Howdy partner!");
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
//# sourceMappingURL=entrypoint.js.map