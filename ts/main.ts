// Global variables
const con = {
    menu: "#menu-container",
    page: "#page-container",
    eduTab: "#education_table",
    expList: "#experience_list"
}

const sesVar = {
    currPg: "currentPage",
    currEdTab: "currentEducationTable",
    currExList: "currentExperienceList"
}

const p = {
    html: "html/",
    ext: ".html",
    doc: "resources/data/"
}

const educationDocuments = [
    "uvic_courses",
    "ufv_courses"
]

$(document).ready(function(){
    // Load default page or last loaded page.
    if(!sessionStorage.getItem(sesVar.currPg)) {
        sessionStorage.setItem(sesVar.currPg, "home");
    }
    $(con.page).load(p.html + sessionStorage.getItem(sesVar.currPg) + p.ext);

    // Menu buttons load the and update the current page.
    $("button").click(function(){
        $(con.page).load(p.html + this.id + p.ext);
        sessionStorage.setItem(sesVar.currPg, this.id);
        loadPageElements(this.id);
    });

    // Load the page elements.
    loadPageElements(sessionStorage.getItem(sesVar.currPg));

    // Handles when a select element changes.
    $(document).on("change", "select", function() {
        switch(this.id) {
            case "education_select":
                var index = this.value;
                loadEducationTable(educationDocuments[index]);
                sessionStorage.setItem(sesVar.currEdTab, index);
            break;

            case "experience_select":

            break;

            default:
                alert("Could not find any actions to perform for: " + this.id);
            break;
        }
    });
});

// Loads elements when a page is first loaded.
function loadPageElements(page: string): void {
    switch(page) {
        case "home":

        break;

        case "education":
            // Check if a table has been loaded
            if(!sessionStorage.getItem(sesVar.currEdTab)) {
                sessionStorage.setItem(sesVar.currEdTab, "0");
            }

            var index = parseInt(sessionStorage.getItem(sesVar.currEdTab));

            if(index > educationDocuments.length) {
                alert("That table could not be loaded. Loading the default table.");
            }

            // Load the default or last loaded table.
            loadEducationTable(educationDocuments[index])
        break;

        case "experience":

        break;

        case "interests":

        break;

        case "projects":

        break;

        default:
            alert("Could not load the items for the page.");
        break;
    }
}

// Creates and loads the education table cased on the document passed.
function loadEducationTable(docName: string): void {
    let xhttp = new XMLHttpRequest();
    let docPath = p.doc + docName + ".txt";

    xhttp.onreadystatechange = function () {
        // Insert loading icon.
        if(this.readyState == 1) {
            $(con.eduTab).html("<tr><td colspan=\"2\"><img class=\"loading\" src=\"resources/images/infinity_loading.gif\"></img></td></tr>");
        }

        // When the response completes load the table.
        if(this.readyState == 4 && this.status == 200) {
            let text = this.responseText.split("\r\n");
            let str: string = "";

            // Concatenate the contents of the file with the html formatting.
            // i is the course code.
            // i+1 is the course name.
            // i+2 is the URL to the academic calendar.
            for(var i = 0; i < text.length; i = i + 4) {
                str += "<tr><td><a href=\"" + text[i+2] + "\">" + text[i] + "</td>";
                str += "<td> " + text[i+1] + "</td></tr>";
            }

            // Insert the text.
            $(con.eduTab).html(str);
        }

        // If the table can't be found alert the user.
        if(this.readyState == 4 && this.status == 404 || this.status == 403) {
            alert("Could not load: " + docName)
        }
    }

    xhttp.open("GET", docPath, true);
    xhttp.send();
}

function buildExperienceList(id: string): string {

    return null;
}