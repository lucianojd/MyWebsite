export function createEducationTable(id, callback) {
    var docPath = "/resources/data/" + id + "_courses.txt";
    // Read file.
    $.ajax({
        url: docPath,
        dataType: "text"
    }).done(function (data) {
        data = data.split("\r\n");
        // Create html.
        var Class = /** @class */ (function () {
            function Class(code, name, url) {
                this.code = code;
                this.name = name;
                this.url = url;
            }
            return Class;
        }());
        // Creat array of class objects.
        var htmlString = "";
        var classes = [];
        for (var i = 0, j = 0; i < data.length; i++) {
            // i++ necessary to skip "\n".
            classes[j++] = new Class(data[i++], data[i++], data[i++]);
        }
        // Sort classes.
        classes.sort(function (a, b) {
            if (a.code > b.code) {
                return 1;
            }
            if (a.code < b.code) {
                return -1;
            }
            return 0;
        });
        // Build html string.
        var c;
        for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
            c = classes_1[_i];
            htmlString += "<tr><td><a href=\"" + c.url + "\" target==\"_blank\">";
            htmlString += c.code + "</a></td>";
            htmlString += "<td>" + c.name + "</td></tr>";
        }
        callback(htmlString);
    });
}
export function createExperienceList(id, callback) {
    var docPath = "/resources/data/" + id.toLowerCase() + ".txt";
    // Open document.
    $.ajax({
        url: docPath,
        dataType: "text"
    }).done(function (data) {
        // Split data based on end of line.
        data = data.split("\r\n");
        // Create html string.
        var htmlString = "";
        for (var i = 0; i < data.length; i++) {
            // Create title.
            htmlString += "<h2>" + data[i] + "</h2>";
            // Create body.
            htmlString += "<p>";
            while (data[++i] != "" && i < data.length) {
                htmlString += data[i];
            }
            htmlString += "</p>";
        }
        console.log(htmlString);
        // Return the html.
        callback(htmlString);
    });
}
