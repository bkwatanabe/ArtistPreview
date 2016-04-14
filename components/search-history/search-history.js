/**
 * Created by brettwatanabe on 3/5/16.
 */
app.directive("searchHistory", ['$log', '$rootScope', '$location', 'Spotify', 'LocalStorageService', function($log, $rootScope, $location, Spotify, LocalStorageService) {
    return{
        restrict: "E",
        templateUrl: 'components/search-history/search-history.html',
        link: function(scope, element, attrs) {

            scope.searchedArtists = LocalStorageService.getSearchedArtists();

            scope.selectArtist = function(artist) {
                $rootScope.currentArtist = artist;
                $location.url('artist-play');
            }
        }
    }
}]);