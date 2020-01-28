function build_education_table(id, path_num) {
    var document_paths = [
        "assets/json/uvic_courses.json",
        "assets/json/ufv_courses.json"
    ];
    var courses = [];
    var content = "";
    //Read in JSON.
    $.getJSON(document_paths[path_num], function (data) {
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
            temp_string += "<td>" + courses[i].course_code + "</td>";
            temp_string += "<td>" + courses[i].course_name + "</td>";
            temp_string += "<td><a target=\"_blank\" href=\"" + courses[i].url + "\">Info<a></td>";
            temp_string += "</tr>";
            content += temp_string;
        }
        //Save page.
        localStorage.setItem("currentEducationTable", path_num.toString());
        //Insert html into table.
        $(id).html(content);
    });
}
function determine_table_to_load(id) {
    var table_num = +localStorage.getItem("currentEducationTable");
    if (!table_num) {
        build_education_table(id, 0);
        return;
    }
    build_education_table(id, table_num);
}
