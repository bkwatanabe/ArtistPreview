var app = angular.module("previewApp", ['spotify', 'ngRoute'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
            template : '<span>Hi! Click <a href="#artist-search">here</a> to get started!</span>'
        })

        // route for the artist-search page
            .when('/artist-search', {
                template : '<h2 class="text-center">Search For An Artist</h2><artist-search class="col-xs-6 col-xs-offset-3"></artist-search>'
            })

            // route for the artist-play page
            .when('/artist-play', {
                template : '<h3 class="text-center">Artist Play</h3><artist-play class="col-xs-6 col-xs-offset-3"></artist-play>'
            });
    }]);