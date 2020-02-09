function load_title_education(id) {
    var container = "#education_table_title";
    var title_template = "Courses completed at: ";
    switch (id) {
        case "ufv":
            $(container).html(title_template + "UFV");
            console.log(title_template + "UFV");
            break;
        case "uvic":
            $(container).html(title_template + "UVic");
            console.log(title_template + "UVic");
            break;
        default:
            break;
    }
}
function import_table(table) {
    var path = "assets/sub-pages/education_page/json/";
    var id = "#education_table_body";
    var document_paths = {
        "uvic": path + "uvic_courses.json",
        "ufv": path + "ufv_courses.json"
    };
    var courses = [];
    var content = "";
    //Set title.
    load_title_education(table);
    //Read in JSON.
    $.getJSON(document_paths[table], function (data) {
        courses = data.courses;
        //Sort alphabetically.
        var min;
        var temp;
        for (var i = 0; i < courses.length; i++) {
            min = i;
            for (var j = i + 1; j < courses.length; j++) {
                if (courses[min].course_code > courses[j].course_code) {
                    min = j;
                }
            }
            //Swap.
            temp = courses[i];
            courses[i] = courses[min];
            courses[min] = temp;
        }
        for (var i = 0; i < courses.length; i++) {
            var temp_string = "";
            temp_string += "<tr>";
            temp_string += "<td><a target=\"_blank\" href=\"" + courses[i].url + "\">" + courses[i].course_code + "</a></td>";
            temp_string += "<td>" + courses[i].course_name + "</td>";
            temp_string += "</tr>";
            content += temp_string;
        }
        //Insert html into table.
        $(id).html(content);
        //Save page.
        localStorage.setItem("currentEducationTable", table);
    });
}
function load_table_education() {
    var tmpTable = localStorage.getItem("currentEducationTable");
    if (!tmpTable) {
        tmpTable = "uvic";
    }
    import_table(tmpTable);
}
function check_table_buttons() {
    $("button").click(function () {
        import_table(this.id);
    });
}
