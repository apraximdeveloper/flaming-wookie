/**
 * Created by devon on 7/7/15.
 */
var app = angular.module('sed', []);

app.factory('twitter', function () {
    var twitterToken = {};
    return {
        initialize: function () {
            OAuth.initialize('3iigtNIcEjUfmZnaIVcXtBV2NZE');
            //return OAuth.popup('twitter');
            OAuth.popup('twitter').done(function (result) {

                twitterToken['get'] = result['get'];
                twitterToken['put'] = result['put'];
                twitterToken['delete'] = result['del'];
                twitterToken['post'] = result['post'];
                twitterToken['del'] = result['del'];
                twitterToken['oauth_token'] = result['oauth_token'];
                twitterToken = result;

            })
        },
        result: twitterToken
    }
});

app.controller('SedController', function ($scope, twitter) {
    $scope.tweets = {};
    $scope.screenName = '';
    $scope.oauthResult = twitter.result;
    $scope.getTweets = function () {

        if (!$scope.oauthResult.oauth_token) {
            alert('please log into twitter');
            return; //initialize wasn't called yet
        }
        var url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?';
        var screen_name = 'screen_name=' + $scope.screenName;
        url = url + screen_name;

        $scope.oauthResult.get(url)
            .done(function (data) {
                $scope.tweets = data;
                $scope.$digest();
            }).fail(function (err) {
                console.log(err);

            });
    };

    $scope.initialize = twitter.initialize;



});