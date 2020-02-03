function import_table(id: string, path_num: number): void {
    var path: string = "assets/sub-pages/education_page/json/";
    
    var document_paths: string[] = [
        path + "uvic_courses.json",
        path + "ufv_courses.json"
    ]
    
    var courses = [];
    var content: string = "";

    //Read in JSON.
    $.getJSON(document_paths[path_num], function(data){
        courses = data.courses

        //Sort alphabetically.
        var min: number;
        var temp: JSON;
        for(var i:number = 0; i < courses.length; i++) {
            min = i
            for(var j:number = i + 1; j < courses.length; j++) {
                if(courses[min].course_code > courses[j].course_code) {
                    min = j;
                }
            }

            //Swap.
            temp = courses[i];
            courses[i] = courses[min]
            courses[min] = temp;
        }

        for(var i:number = 0; i < courses.length; i++) {
            var temp_string: string = "";

            temp_string += "<tr>";
            temp_string += "<td>"+courses[i].course_code+"</td>";
            temp_string += "<td>" + courses[i].course_name + "</td>";
            temp_string += "<td><a target=\"_blank\" href=\"" + courses[i].url + "\">Info<a></td>";
            temp_string += "</tr>"

            content += temp_string;
        }

        //Insert html into table.
        $(id).html(content);

        //Save page.
        localStorage.setItem("currentEducationTable", path_num.toString());
    })
}

function load_table(id: string): void {
    var table_num: number = +localStorage.getItem("currentEducationTable");

    if(!table_num) {
        table_num = 0;
    }

    import_table(id, table_num);
}