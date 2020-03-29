export function createEducationTable(id, callback): void {
    var docPath: string = "/resources/data/" + id + "_courses.txt";

    // Read file.
    $.ajax({
        url: docPath,
        dataType: "text",
    }).done(function(data) {
        data = data.split("\r\n");
        
        // Create html.
        class Class {
            code: string
            name: string
            url: string

            constructor(code: string, name: string, url: string) {
                this.code = code;
                this.name = name;
                this.url = url;
            }
        }

        // Creat array of class objects.
        var htmlStr = "";
        var classes: Class[] = [];
        for(var i: number = 0, j: number = 0; i < data.length; i++) {
            // i++ necessary to skip "\n".
            classes [j++] = new Class(data[i++], data[i++], data[i++])
        }

        // Sort classes.
        classes.sort(function(a, b): number {
            if(a.code > b.code) { return 1; }

            if(a.code < b.code) { return -1; }

            return 0;
        });
    
        // Build html string.
        var c: any;
        for(c of classes) {
            htmlStr += "<tr><td><a href=\"" + c.url +"\" target==\"_blank\">";
            htmlStr += c.code + "</a></td>";
            htmlStr += "<td>" + c.name + "</td></tr>";
        }

        callback(htmlStr);
    });
}

export function createExperienceList(id, callback) {
    var docPath: string = "/resources/data/" + id.toLowerCase() + ".txt";

    // Open document.
    $.ajax({
        url: docPath,
        dataType: "text"
    }).done(function(data) {
        data = data.split("\r\n");

        console.log(data);
    })
}