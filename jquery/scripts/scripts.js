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

    if ($(".message-list li").length > 7) {
        $(".message-list li:nth-child(1)").remove();
    }
});

// Converter Widget 
// $("label[for='usd']");
$(".currency-list").keyup(function(e) {
    
    if (e.target.id === "usd") {
        let gbp = (+$("#usd").val() - 3).toFixed(1);
        let byn = (+$("#usd").val() - 2).toFixed(1);

        if((gbp + "").length > 5) {
            gbp = "99999+";
        }

        if((byn + "").length > 5) {
            byn = "99999+";
        }

        $("#gbp").val(gbp);
        $("#byn").val(byn);
    }
    
    if (e.target.id === "gbp") {
        let usd = (+$("#gbp").val() + 3).toFixed(1);
        let byn = (+$("#gbp").val() + 1).toFixed(1);

        if((usd + "").length > 5) {
            usd = "99999+";
        }

        if((byn + "").length > 5) {
            byn = "99999+";
        }

        $("#usd").val(usd);
        $("#byn").val(byn);
    }

    if (e.target.id === "byn") {
        let usd = (+$("#byn").val() + 2).toFixed(1);
        let gbp = (+$("#byn").val() - 1).toFixed(1);

        if((usd + "").length > 5) {
            usd = "99999+";
        }

        if((gbp + "").length > 5) {
            gbp = "99999+";
        }

        $("#usd").val(usd);
        $("#gbp").val(gbp);
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
            "type": "text",
            "maxlength": "5"    
        }).addClass("currency-input byn").val((+$("#usd").val() - 2).toFixed(1));
        let label = $("<label></label>").attr("for", "byn");

        div.append(p);
        li.append(div).append(input).append(label);

        currencyList.append(li);

        $(".add-currency").removeClass("add-currency").addClass("remove-currency");

        return; // return here is needed to prevent collisions
    }

    if (e.target.className === "remove-currency") {
        $(".currency-list li:nth-child(3)").remove();
        $(".remove-currency").removeClass("remove-currency").addClass("add-currency");

        return; // return here is needed to prevent collisions
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

        return;    // return here is needed to prevent multiple choose
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

        return;   // return here is needed to prevent multiple choose
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

    if (e.target.className === "list-view-button") {
        if ($("div.choose-city").length === 0) {
            let weatherBoard = $(".weather-board");
            let citys = $("p.city");
            let div = $("<div></div>").toggleClass("choose-city");
            let ul = $("<ul></ul>").toggleClass("list-of-citys");

            weatherBoard.append(div);
            div.append(ul);

            for (let i = 0; i < citys.length; i++) {
                let li = $("<li></li>").toggleClass("city-list-item").text($(citys[i]).text()).attr("id", i);
                ul.append(li);
            }
        } else {
            $("div.choose-city").toggleClass("choose-city");
        }

    }

    if (e.target.className === "city-list-item") {
        let slides = $("input[name='slides']");
        let cityId = e.target.id;
        let slideId = slides[cityId].id;

        $("div.choose-city").toggleClass("choose-city");
        $("#" + slideId).prop("checked", true);
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

$(".login-block").on("click", function(e) { 
    if ($(e.target).hasClass("signup-button") && $(e.target).hasClass("activate-login")) {
        $(".signup-tooltip").toggleClass("visibility");
    }

    if ($(e.target).hasClass("signin-button") && $(e.target).hasClass("activate-login")) {
        $(".signin-tooltip").toggleClass("visibility");
    }
});

// Calendar Widget
$("#calendar").datepicker({
    minDate: new Date(Date.now())
});

// Circles Widget
$(".circles").on("click", function(e) {
    if (e.target.className === "circle-button") {
        let firstVal = +$(".circle-input-first-value").val();
        let secondVal = +$(".circle-input-second-value").val();
        let thirdVal = +$(".circle-input-third-value").val();

        if ((firstVal + secondVal + thirdVal) > 100) {
            alert("Wrong data!");
            return;
        } else {
            // Strait Circle
            $(".total-percentage").text((firstVal + secondVal + thirdVal) + "%");

            $(".circle-straight-first-value").css({
                height: firstVal / 0.625
            });

            $(".circle-straight-second-value").css({
                height: secondVal / 0.625,
                bottom: firstVal / 0.625
            });

            $(".circle-straight-third-value").css({
                height: thirdVal / 0.625,
                bottom: firstVal / 0.625 + secondVal / 0.625 
            });

            // Circle Fill and Circle Around
            if (firstVal <= 50) {
                $(".circle-first .inner-sector").css({                
                    transform: `rotate(${firstVal * 3.6}deg)`
                });
            } else { // It is needed in case when rotation is more than 180 degree
                $(".circle-background").css({
                    "background-color": "#56e5f6"
                });
            }            

            if (secondVal <= 50) {
                $(".circle-second").css({
                     transform: `rotate(${firstVal * 3.6}deg)`
                });

                $(".circle-second .inner-sector").css({                
                    transform: `rotate(${secondVal * 3.6}deg)`
                });
            } else { // It is needed in case when rotation is more than 180 degree
                $(".circle-background").css({
                    "background-color": "#4cd9c0"
                });
            }

            if (thirdVal <= 50) {
                $(".circle-third").css({
                    transform: `rotate(${(firstVal + secondVal) * 3.6}deg)`
                });

                $(".circle-third .inner-sector").css({                
                    transform: `rotate(${thirdVal * 3.6}deg)`
                });
            } else { // It is needed in case when rotation is more than 180 degree
                $(".circle-background").css({
                    "background-color": "#ec747d"
                });
            }
        }
    }
});