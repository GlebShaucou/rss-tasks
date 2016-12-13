// Chat Widget "+" button 
$(".add-dlg-button").on("click", function(e) {
    let newContact = $(".chat-menu input").val();
    if (newContact !== "") {
        let li = $("<li></li>");
        let a = $("<a></a>");
        let img = $("<img></img>").addClass("avatar").attr("src", "./img/placeholder.gif").attr("alt", "Profile photo");
        let h3 = $("<h3></h3>").text(newContact);
        let p = $("<p></p>").addClass("message");

        a.append(img);
        li.append(a);
        li.append(h3);
        li.append(p);

        $(".message-list").append(li);
        $(".chat-menu input").val("");
    } else {
        alert("Enter contact name!");
    }
});

//
$(".currency-input")