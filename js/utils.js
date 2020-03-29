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
        var htmlStr = "";
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
            htmlStr += "<tr><td><a href=\"" + c.url + "\" target==\"_blank\">";
            htmlStr += c.code + "</a></td>";
            htmlStr += "<td>" + c.name + "</td></tr>";
        }
        callback(htmlStr);
    });
}
export function createExperienceList(id, callback) {
    var docPath = "/resources/data/" + id.toLowerCase() + ".txt";
    // Open document.
    $.ajax({
        url: docPath,
        dataType: "text"
    }).done(function (data) {
        data = data.split("\r\n");
        console.log(data);
    });
}
