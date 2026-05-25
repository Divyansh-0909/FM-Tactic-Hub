const bcrypt = require("bcryptjs");
const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

const prisma = require("../lib/prisma");

const JwtStrategy = require("passport-jwt").Strategy;

const ExtractJwt = require("passport-jwt").ExtractJwt;

// PASSPORT STRATEGY

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },

    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return done(null, false, {
            message: "No account found with that email",
          });
        }

        // ✅ Handle Google users who have no password
        if (!user.password) {
          return done(null, false, {
            message: "This account uses Google to sign in",
          });
        }

        const match = await bcrypt.compare(
          password,
          user.password
        );

        if (!match) {
          return done(null, false, {
            message: "Incorrect email or password",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest:
                ExtractJwt.fromAuthHeaderAsBearerToken(),

            secretOrKey:
                process.env.JWT_SECRET,
        },

        async (payload, done) => {

            try {

                const user =
                    await prisma.user.findUnique({
                        where: {
                            id: payload.id,
                        },
                    });

                if (!user) {
                    return done(null, false);
                }

                return done(null, user);

            } catch (error) {

                return done(error, false);
            }
        }
    )
);


passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// GOOGLE STRATEGY

const GOOGLE_PROVIDER = "https://accounts.google.com";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/oauth2/redirect/google`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        // 1. Check for existing federated credential
        const cred = await prisma.federatedCredential.findUnique({
          where: {
            provider_subject: {
              provider: GOOGLE_PROVIDER,
              subject: String(profile.id),
            },
          },
          include: { user: true },
        });

        if (cred) {
          return done(null, cred.user);
        }

        const email = profile.emails?.[0]?.value ?? null;

        // 2. Check if a local account with this email already exists
        const existingUser = email
          ? await prisma.user.findUnique({ where: { email } })
          : null;

        if (existingUser) {
          // Link Google to their existing account
          await prisma.federatedCredential.create({
            data: {
              provider: GOOGLE_PROVIDER,
              subject: String(profile.id),
              userId: existingUser.id,
            },
          });
          return done(null, existingUser);
        }

        // 3. Brand new user — create account + credential together
        const displayName = profile.displayName
          ? profile.displayName.replace(/\s+/g, "_").toLowerCase()
          : `user_${Date.now()}`;

        const user = await prisma.user.create({
          data: {
            username: displayName,
            email,
            federatedCredentials: {
              create: {
                provider: GOOGLE_PROVIDER,
                subject: String(profile.id),
              },
            },
          },
        });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;