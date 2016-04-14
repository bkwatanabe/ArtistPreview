/**
 * Created by brettwatanabe on 3/8/16.
 */
app.service('LocalStorageService', function(){

    this.getSearchedArtists = function() {
        return JSON.parse(localStorage.getItem('searchedArtists')) || [];
    };
    this.saveArtist = function(artist){
        console.log("I'm in local storage service.");
        var name = artist.name;
        console.log(name);
        var id = artist.id;
        var object = {name: name,
                      id: id,
                      relatedArtists: []
        }
        var objectInJson = angular.toJson(object);
        console.log(objectInJson);
        localStorage.setItem("searchedArtists", objectInJson);
        var artists = this.getSearchedArtists();
        console.log("artists", artists);
    };
});