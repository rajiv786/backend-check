const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000";
const CLIENT_UL = "http://localhost:3000";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_UL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile",'email'] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: 'http://localhost:3000/services',
	  failureRedirect: "/login/failed",
	  function(req, res) {
		// generate a token and send it to the client
		const token = jwt.sign({ user: req.user }, 'secret', { expiresIn: '8d' });
		
	  }
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router