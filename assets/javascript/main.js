var topics = ["dogs", "cats", "birds"]

$("#add").on("click", function () {
    event.preventDefault();
    console.log("logged");
    var add = $("#input").val();
    topics.push(add);
    buttons;
});

function buttons() {
    $("#buttons").empty();

    for (i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.attr("id", topics[i]);
        newButton.attr("class", "buttons btn btn-primary");
        newButton.val(topics[i]);
        newButton.html(topics[i]);
        $("#buttons").append(newButton);
    }
}

$("body").on("click","img",function() {

    console.log("this");
    var state = $(this).attr("state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("animate"));
        $(this).attr("state", "animate");
    } else {
        $(this).attr("src", $(this).attr("still"));
        $(this).attr("state", "still");
    }

});

buttons();

$(".buttons").on("click", function () {
    event.preventDefault();
    selected = $(this).attr("id");
    console.log(selected, "hi");
    var number = "10"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + selected + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {

            $("#gifs").empty();
            var results = response.data

            for (var i = 0; i < results.length; i++) {

                var newDiv = $("<div>");
                var newP = $("<p>");
                newP.html("<h3>Rating: " + results[i].rating.toUpperCase() + "</h3>");
                var gif = $("<img>");
                gif.attr("src", results[i].images.fixed_height_still.url);
                gif.attr("animate", results[i].images.fixed_height.url);
                gif.attr("still", results[i].images.fixed_height_still.url);
                gif.attr("state", "still");
                gif.attr("alt", "response.data.caption");
                gif.addClass("gif img-responsive");
                newDiv.append(newP);
                newDiv.append(gif);
                $("#gifs").append(newDiv);

            }

        });
});

