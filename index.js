const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const app = express();
app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		
	         
	    optionSuccessStatus:200,
	  origin: "http://localhost:3000",
	  methods: "GET,POST,PUT,DELETE",
	  credentials: true,
	})
  );

app.use("/auth", authRoutes);

app.listen("8080", () => {
  console.log("Server is running!");
});