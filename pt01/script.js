document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('getMessage').onclick = function () {
        const req = new XMLHttpRequest();
        req.open("GET", 'cats.json', true);
        req.send();
        req.onload = function () {
            const json = JSON.parse(req.responseText);
            let html = "";
            json.forEach(function (val) {
                const keys = Object.keys(val);
                html += "<div class = 'cat'>";
                html += "<img src = '" + val.imageLink + "' " + "alt='" + val.altText + "'>";

            });

            document.getElementsByClassName('message')[0].innerHTML = html;
        };
    };
});




