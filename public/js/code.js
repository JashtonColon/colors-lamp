var urlBase = 'http://jashtonlabcop4331.xyz/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

function doLogin() {
    userId = 0;
    firstName = "";
    lastName = "";

    var login = document.getElementById("loginName").value;
    var password = document.getElementById("loginPassword").value;
    var hash = md5(password);

    document.getElementById("loginResult").innerHTML = "";

    var jsonPayload = JSON.stringify({login: login, password: hash});
    var url = urlBase + '/Login.' + extension;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;

                if (userId < 1) {
                    document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
                    return;
                }

                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

                saveCookie();

                window.location.href = "color.html";
            }
        };
        xhr.send(jsonPayload);
    } catch(err) {
        document.getElementById("loginResult").innerHTML = err.message;
    }
}

function addColor() {
    var color = document.getElementById("colorText").value;
    document.getElementById("colorAddResult").innerHTML = "";

    readCookie();

    var jsonPayload = JSON.stringify({userId: userId, color: color});
    var url = urlBase + '/AddColor.' + extension;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var jsonObject = JSON.parse(xhr.responseText);
                if (jsonObject.error && jsonObject.error.length > 0) {
                    document.getElementById("colorAddResult").innerHTML = jsonObject.error;
                } else {
                    document.getElementById("colorAddResult").innerHTML = "Color has been added";
                    document.getElementById("colorText").value = "";
                }
            }
        };
        xhr.send(jsonPayload);
    } catch(err) {
        document.getElementById("colorAddResult").innerHTML = err.message;
    }
}

function searchColor() {
    var srch = document.getElementById("searchText").value;
    document.getElementById("colorSearchResult").innerHTML = "";

    readCookie();

    var jsonPayload = JSON.stringify({search: srch, userId: userId});
    var url = urlBase + '/SearchColors.' + extension;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var jsonObject = JSON.parse(xhr.responseText);
                var text = "";
                if (jsonObject.results) {
                    for (var i = 0; i < jsonObject.results.length; i++) {
                        text += jsonObject.results[i] + "<br />";
                    }
                }
                document.getElementById("colorList").innerHTML = text;
            }
        };
        xhr.send(jsonPayload);
    } catch(err) {
        document.getElementById("colorSearchResult").innerHTML = err.message;
    }
}

function saveCookie() {
    var minutes = 20;
    var date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie() {
    userId = -1;
    var data = document.cookie;
    var splits = data.split(",");
    for (var i = 0; i < splits.length; i++) {
        var thisOne = splits[i].trim();
        var tokens = thisOne.split("=");
        if (tokens[0] == "firstName") {
            firstName = tokens[1];
        } else if (tokens[0] == "lastName") {
            lastName = tokens[1];
        } else if (tokens[0] == "userId") {
            userId = parseInt(tokens[1].trim());
        }
    }

    if (userId < 0) {
        window.location.href = "index.html";
    } else {
        if (document.getElementById("userName")) {
            document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
        }
    }
}

function doLogout() {
    userId = 0;
    firstName = "";
    lastName = "";
    document.cookie = "firstName=; lastName=; userId=-1; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html";
}
