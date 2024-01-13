const {KeycloakStrategy} = require('keycloak-passport');
const passport = require(passport)
passport.use(
    "keycloak",
    new KeycloakStrategy(
      {
        host: "http://localhost:8080/",
        realm: 'Demo-Realm',
        clientID: 'mern_crud_app_1',
        clientSecret: 'd56AejXPXK19nkEjFrXu5AGh88n9PaxW',
        callbackURL: `/`
      },
      (accessToken, refreshToken, profile, done) => {
        // This is called after a successful authentication has been completed
        // Here's a sample of what you can then do, i.e., write the user to your DB
        User.findOrCreate({ email: profile.email }, (err, user) => {
          assert.ifError(err);
          user.keycloakId = profile.keycloakId;
          user.imageUrl = profile.avatar;
          user.name = profile.name;
          user.save((err, savedUser) => done(err, savedUser));
        });
      }
    )
  );