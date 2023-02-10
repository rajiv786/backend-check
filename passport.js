const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const router = require("./routes/auth");
const jwt = require('jsonwebtoken');
const Ser = process.env.Ser;

const GOOGLE_CLIENT_ID =
  "73790928133-suk88f55p624r77bnohl5iv3l6g3tjtm.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

GITHUB_CLIENT_ID = "your id";
GITHUB_CLIENT_SECRET = "your id";

FACEBOOK_APP_ID = "your id";
FACEBOOK_APP_SECRET = "your id";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
	async (accessToken, refreshToken, profile, done) => {
		console.log(profile);
		console.log(accessToken, 'ss');
		const token = jwt.sign(profile, 'Hubhawks');
		
        done(null, token);
		
	  }
  )
);
router.use(passport.initialize());

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
		
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
