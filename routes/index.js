var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    idToken: req.oidc.idToken,
    accessToken: req.oidc.accessToken.access_token,
    refreshToken: req.oidc.refreshToken,
    title: 'Profile page'
  });
});

router.get('/userinfo', requiresAuth(), async function (req, res, next) {
  const userInfo = await req.oidc.fetchUserInfo();
  res.render('userinfo', {
    userInfo: JSON.stringify(userInfo, null, 2),
    title: 'UserInfo page'
  });
});

module.exports = router;
