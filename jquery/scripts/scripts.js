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
$(".currency-input").attr("maxlength","5");

$("#usd").keydown(function() {
    $("#gbr").val(+$("#usd").val() + 1.8);
});

$("#usd").keyup(function() {
    $("#gbr").val(+$("#usd").val() + 1.8);
});

$(".add-currency").on("click", function(e) {
    let currencyList = $(".currency-list");
    let li = $("<li></li>");
    let div = $("<div></div>").addClass("currency-name");
    let p = $("<p></p>").text("BYN");
    let input = $("<input>").attr({
        "id": "usd",
        "type": "number"    
    }).addClass("currency-input byn").val(+$("#usd").val() * 2);
    let label = $("<label></label>").attr("for", "byn");

    div.append(p);
    li.append(div);
    li.append(input);
    li.append(label);

    currencyList.append(li);    
});