// Declare global variables
var APIkey = "wG8UJVd4lxzRg9zpjiNX5C0HMRZ9oqyH";
var buttonsArray = ["jeremy clarkson", "james may", "richard hammond", "top gear", "the grand tour", "mazda rx7", "dodge viper", "subaru sti", "nissan gtr"];

// wait for the html to load
$(document).ready(function(){
    // Populate the page with buttons from base data
    $.each(buttonsArray, function(index, value){
        var button = $("<div>");
        $(button).addClass("gif-button");
        button.text(value);
        button.attr("data-search", value);
        $("#button-div").append(button);
    });
    // Function to add new buttons
    $("#new-button").on("click", function(){
        event.preventDefault();
        var text = $("#userInput").val().trim();
        buttonsArray.push(text);
        $("#button-div").empty();
        $.each(buttonsArray, function(index, value){
            var button = $("<div>");
            button.text(buttonsArray[index]);
            $(button).addClass("gif-button");
            button.attr("data-search", value);
            $("#button-div").append(button);
        });
    });
    // Populate page with still versions of the gif from ajax call using button text as search parameter
    $(document).on("click", ".gif-button", function(){
        event.preventDefault();
        var term = $(this).attr("data-search");
        $.ajax({
            method: "GET",
            url: "http://api.giphy.com/v1/gifs/search?q="+term+"&api_key="+APIkey+"&limit=10"
        }).then(function(response) {
            var items = response.data;
            console.log(response);
            console.log("items:", items);
            // Loop over the responses, and append gif's to the page
            $.each(items, function(index, value){
                // Create a div to hold the image and other display data div
                var container = $("<div>");
                container.addClass("main");
                // Create a div to hold the gif info
                var gifData = $("<div>");
                gifData.addClass("gif-data");

                // Create a div to hold the rating
                var ratingDiv = $("<div>");
                ratingDiv.text("<strongRating: "+ items[index].rating);
                ratingDiv.addClass("dataDiv");
                gifData.prepend(ratingDiv);
                // Create div to hold uploaded by username
                var usernameDiv = $("<div>");
                usernameDiv.text("Uploaded By: " +items[index].user.display_name);
                usernameDiv.addClass("dataDiv");
                gifData.append(usernameDiv);

                // Create a div to hold the title
                var titleDiv = $("<div>");
                titleDiv.text("Title: " +items[index].title);
                titleDiv.addClass("dataDiv");
                gifData.append(titleDiv);

                // Create a div to hold the upload date
                var dateDiv = $("<div>");
                var date = moment(items[index].import_datetime).format("dddd, MMMM Do YYYY");
                dateDiv.text("Upload Date: " +date);
                dateDiv.addClass("dataDiv");
                gifData.append(dateDiv);

                // Create the image
                var image = $("<img>");
                image.attr("data-animate", "still");
                image.addClass("still-animate");
                image.attr("src", items[index].images.original_still.url);
                image.attr("still-source", items[index].images.original_still.url);
                image.attr("animate-source", items[index].images.downsized.url);
                // Code to incorporate mp4 plugin
                // image.attr("data-mode", "video");
                // image.attr("data-mp4", items[index].images.original_mp4.mp4);
                // image.attr("data-webm", items[index].images.original.webp);
                container.append(image);
                container.prepend(gifData);
                $("#gifDiv").prepend(container);
            });
            });
        });
    // Make the still imagage animate when you click, and still when you click again
    $(document).on("click", ".still-animate", function(){
        if ($(this).attr("data-animate") === "still"){
            $(this).attr("data-animate", "animate");
            $(this).attr("src", $(this).attr("animate-source"));
        } else {
            $(this).attr("data-animate", "still");
            $(this).attr("src", $(this).attr("still-source"));        }
    })
});
