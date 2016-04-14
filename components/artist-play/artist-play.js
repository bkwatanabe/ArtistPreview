/**
 * Created by brettwatanabe on 3/5/16.
 */
app.directive("artistPlay", ['$http', '$log', '$rootScope', '$sce', 'Spotify', function($http, $log, $rootScope, $sce, Spotify ){
    return {
        restrict: "E",
        templateUrl: "components/artist-play/artist-play.html",
        link: function(scope, element, attrs) {
            scope.index = 0;
            var player = angular.element(document.getElementById("player"));
            $log.log("player", player);
//            player.bind("timeupdate", function(event) {
//                $log.log("event", event);
//                scope.currentTime = event.currentTarget.currentTime;
//                scope.apply();
//            });
            player.bind("ended", function(event){
                $log.log("event", event);
                if(scope.index === scope.topTracks.length - 1){
                    scope.index = 0;
                    $log.log("reset index");
                }
                else{
                    scope.index += 1;
                    $log.log("scope.index", scope.index);
                }
                scope.currentTrackSrc = $sce.trustAsResourceUrl(scope.topTracks[scope.index].preview_url);
                scope.$apply();
            });

            //US is default
            var countryCode = "US";

            //Gets current country code
            $http.get("https://freegeoip.net/json/")
                .then(function(data){
                    countryCode = data.data.country_code;
                }, function(err){
                    $log.log(err);
                });

            //$rootScope.$on("selectArtist", function(event, artist){
            //    scope.artist = artist;
            //    Spotify.getArtistTopTracks(artist.id, countryCode)
            //        .then(function (data) {
            //            scope.topTracks = data.tracks;
            //            scope.currentTrackSrc = $sce.trustAsResourceUrl(scope.topTracks[scope.index].preview_url);
            //        });
            //});

            $rootScope.$watch("currentArtist", function(){
                scope.artist = $rootScope.currentArtist;
                if (scope.artist && scope.artist.id){
                    Spotify.getArtistTopTracks(scope.artist.id, countryCode)
                        .then(function (data) {
                            scope.topTracks = data.tracks;
                            scope.currentTrackSrc = $sce.trustAsResourceUrl(scope.topTracks[scope.index].preview_url);
                        });
                }
            });
            scope.selectTrack = function($index){
                scope.index = $index;
                scope.currentTrackSrc = $sce.trustAsResourceUrl(scope.topTracks[scope.index].preview_url);
            };
        }
    };
}]);