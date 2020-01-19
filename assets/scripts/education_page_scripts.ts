function build_education_table(id: string, path: string) {
    var HTMLString = "";

    //Read in JSON and generate table.
    $.getJSON(path, function(data){
        $.each(data.courses, function(i, data){
            
        })
    })
}