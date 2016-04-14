/**
 * Created by brettwatanabe on 3/5/16.
 */
app.directive("artistSearch", ['$log', '$rootScope', '$location', 'Spotify', 'LocalStorageService', function($log, $rootScope, $location, Spotify, LocalStorageService) {
    return{
        restrict: "E",
        templateUrl: 'components/artist-search/artist-search.html',
        link: function(scope, element, attrs) {
            scope.result = [];
            scope.$watch("search", function(){
                if(scope.search){
                    Spotify.search(scope.search, 'artist').then(function (data) {
                        scope.result = data.artists.items;
                        $log.log(scope.result);
                    });
                }
                else{
                    scope.result = []
                }
            });
            scope.selectArtist = function(artist) {
                console.log('artist', artist);
                //scope.$emit("selectArtist", artist);
                $rootScope.currentArtist = artist;
                LocalStorageService.saveArtist(artist);
                $location.url('artist-play');
            }
        }
    }
}]);