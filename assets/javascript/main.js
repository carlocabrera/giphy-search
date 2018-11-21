$(document).ready(function () {
    //new gif button array
    var giphy = [];
    //display gif search buttons
    function gifButtons() {
        $("#displayGifButtons").empty();
        for (var i = 0; i < giphy.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("giphyGifs");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", giphy[i]);
            gifButton.text(giphy[i]);
            $("#displayGifButtons").append(gifButton);
        }
    }
    //add new gif search buttons
    function addNewButton() {
        $("#addGif").on("click", function () {
            var giphyGifs = $("#gifInput").val().trim();
            if (giphyGifs == "") {
                return false;
            }
            giphy.push(giphyGifs);

            gifButtons();
            return false;
        });
    }
    
    //display gifs function
    function displayGifs() {
        var giphyGifs = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + giphyGifs + "&api_key=NWP8fJkXCgaeDkeMwDOTWw6NBuIWc8a9";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .done(function (response) {
                console.log(response); 
                $("#displayGifs").empty(); 
                var results = response.data;
                if (results == "") {
                    alert("Sorry... No Gifs Available!");
                }
                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifDiv");
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(gifRating);
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);
                    $("#displayGifs").prepend(gifDiv);
                }
            });
    }
    // Call Functions & Click Events
    addNewButton();

    $(document).on("click", ".giphyGifs", displayGifs);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});
