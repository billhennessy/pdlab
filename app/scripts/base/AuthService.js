/**
 * Created by billh_000 on 9/18/2014.
 */
'use strict';

app.factory('Auth', function ($firebaseSimpleLogin, $firebase, FIREBASE_URL, $rootScope) {
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseSimpleLogin(ref);

    var Auth = {
      register: function (user) {

            return auth.$createUser(user.email, user.password);
        },
      createProfile: function (user) {


        var profile = {

                username: user.username,
                md5_hash: user.md5_hash,
                lab: user.lab,
          points: user.points

            };

        var profileRef = $firebase(ref.child('profile'));
            return profileRef.$set(user.uid, profile);
        },
      login: function (user) {
            return auth.$login('password', user);
        },
      glogin: function (user) {


        return auth.$login('google', {
          rememberMe: true,
          scope: 'https://www.googleapis.com/auth/plus.login'
        }).then(function () {
          console.log(auth.user);
        });


      },
      logout: function () {
            auth.$logout();
        },
      resolveUser: function () {
            return auth.$getCurrentUser();
        },
      signedIn: function () {
            return !!Auth.user.provider;
        },

      changePassword: function (email, oldpassword, newpassword) {
            return auth.$changePassword(email, oldpassword, newpassword);
        },

      resetPassword: function (email) {
            return auth.$sendPasswordResetEmail(email);
        },

        user: {}
    };

  $rootScope.$on('$firebaseSimpleLogin:login', function (e, user) {
        angular.copy(user, Auth.user);
        Auth.user.profile = $firebase(ref.child('profile').child(Auth.user.uid)).$asObject();
        console.log('logged in');
    });
  $rootScope.$on('$firebaseSimpleLogin:logout', function () {
        console.log('logged out');

        if (Auth.user && Auth.user.profile) {
            Auth.user.profile.$destroy();
        }
        angular.copy({}, Auth.user);
    });

    return Auth;
});

/*

 app.factory('Auth',
 function ($firebaseSimpleLogin, FIREBASE_URL, $rootScope) {
 var ref = new Firebase(FIREBASE_URL);

 var auth = $firebaseSimpleLogin(ref);

 var Auth = {
 register: function (user) {
 return auth.$createUser(user.email, user.password);
 },
 changePassword: function (email, oldpassword, newpassword) {
 return auth.$changePassword(email, oldpassword, newpassword);
 },
 signedIn: function () {
 return auth.user !== null;
 },
 login: function (user) {
 return auth.$login('password', user);
 },
 logout: function () {
 auth.$logout();
 },
 resetPassword: function (email) {
 return auth.$sendPasswordResetEmail(email);
 }


 };

 $rootScope.signedIn = function () {
 return Auth.signedIn();
 };

 return Auth;
 });*/
