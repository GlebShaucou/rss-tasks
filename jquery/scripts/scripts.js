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
        li.append(a).append(h3).append(p);

        $(".message-list").append(li);
        $(".chat-menu input").val("");
    } else {
        alert("Enter contact name!");
    }
});

// Converter Widget 

// $("label[for='usd']");

$(".currency-list").keyup(function(e) {
    
    if (e.target.id === "usd") {
        $("#gbr").val((+$("#usd").val() - 3).toFixed(1));
        $("#byn").val((+$("#usd").val() - 2).toFixed(1));
    }
    
    if (e.target.id === "gbr") {
        $("#usd").val((+$("#gbr").val() + 3).toFixed(1));
        $("#byn").val((+$("#gbr").val() + 1).toFixed(1));
    }

    if (e.target.id === "byn") {
        $("#usd").val((+$("#byn").val() + 2).toFixed(1));
        $("#gbr").val((+$("#byn").val() - 1).toFixed(1));
    }
});

$(".converter-menu").on("click", function(e) {
    if (e.target.className === "add-currency") {
        let currencyList = $(".currency-list");
        let li = $("<li></li>");
        let div = $("<div></div>").addClass("currency-name");
        let p = $("<p></p>").text("BYN");
        let input = $("<input>").attr({
            "id": "byn",
            "type": "number"    
        }).addClass("currency-input byn").val(+$("#usd").val() * 2);
        let label = $("<label></label>").attr("for", "byn");

        div.append(p);
        li.append(div).append(input).append(label);

        currencyList.append(li);

        $(".add-currency").removeClass("add-currency").addClass("remove-currency");

        return;
    }

    if (e.target.className === "remove-currency") {
        $(".currency-list li:nth-child(3)").remove();
        $(".remove-currency").removeClass("remove-currency").addClass("add-currency");

        return;
    }
});

// Weather Widget
$(".weather").on("click", function(e) {
    if (e.target.id === "fahrenheit") {
        if (!$(e.target).hasClass("selected-scale")) {
            let temps = $(".temperature");
            
            for (let i = 0; i < temps.length; i++) {
                let temp = +$(temps[i]).text(); 
                $(temps[i]).text(((temp * 9) / 5 + 32).toFixed(0));
            }

            $(e.target).addClass("selected-scale");
            $("#celsius").removeClass("selected-scale");
        }    

        return;    
    }

    if (e.target.id === "celsius") {
        if (!$(e.target).hasClass("selected-scale")) {
            let temps = $(".temperature");
            
            for (let i = 0; i < temps.length; i++) {
                let temp = +$(temps[i]).text(); 
                $(temps[i]).text((((temp - 32) * 5) / 9).toFixed(0));
            }

            $(e.target).addClass("selected-scale");
            $("#fahrenheit").removeClass("selected-scale");
        }    

        return;   
    }

    if (e.target.className === "add-place-button") {
        $(".add-city-form").toggleClass("add-city-form-out");
    }

    if (e.target.id === "add-place") {
        let city = $("input[name='city']").val();
        let temperature = $("input[name='temperature']").val();
        let imageUrl = $("input[name='image']").val();

        let slider = $(".slider");
        let label = $("<label></label>").attr("for", "slide" + "-" + city);

        let weatherBoard = $(".weather-board");
        let input = $("<input>").attr({
            "id": "slide" + "-" + city,
            "type": "radio",
            "name": "slides"
        });
        let div = $("<div></div>").addClass("slide").css({ "background": "url(" + imageUrl + ")" });

        let oldWidth = +slider.css("width").slice(0, -2);
        let newWidth = oldWidth + 16;
        
        let divWeather = $("<div></div>").addClass("weather-info");
        let pTemp = $("<p></p>").addClass("temperature").text(temperature);
        let pCity = $("<p></p>").addClass("city").text(city);

        divWeather.append(pTemp);
        divWeather.append(pCity);
        divWeather.append("12:34 am");

        div.append(divWeather);

        $(".add-city-form").toggleClass("add-city-form-out");

        slider.css("width", newWidth);
        slider.append(label);

        weatherBoard.append(input).append(div);

        return;
    }
});

//Login Sign Up Widget
$(".login-block").keyup(function(e) {
    if (e.target.id === "email") {
        let re = /[a-z0-9.]+@[a-z0-9.]+.[a-z]{3,4}/i;
        if (re.test($(e.target).val())) {
            $(e.target).removeClass("invalid-login").addClass("valid-login");
            checkForm();
        } else {
            $(e.target).removeClass("valid-login").addClass("invalid-login");
            checkForm();
        }
    }

    if (e.target.id === "password") {
        let re = /[a-z0-9]{8,32}/ig;
        if (re.test($(e.target).val())) {
            $(e.target).removeClass("invalid-login").addClass("valid-login");
            checkForm();
        } else {
            $(e.target).removeClass("valid-login").addClass("invalid-login");
            checkForm();
        }
    }

    function checkForm() {
        if($("#email").hasClass("valid-login") && $("#password").hasClass("valid-login")) {
            $(".signup-button").addClass("activate-login");
            $(".signin-button").addClass("activate-login");    
        } else {
            $(".signup-button").removeClass("activate-login");
            $(".signin-button").removeClass("activate-login");
        }
    }
});

// Calendar Widget
$("#calendar").datepicker({
    minDate: new Date(Date.now())
});