// Global variables
var con = {
    menu: "#menu-container",
    page: "#page-container",
    eduTab: "#education_table",
    expList: "#experience_list"
};
var sesVar = {
    currPg: "currentPage",
    currEdTab: "currentEducationTable",
    currExList: "currentExperienceList"
};
var p = {
    html: "html/",
    ext: ".html",
    doc: "resources/data/"
};
var educationDocuments = [
    "uvic_courses",
    "ufv_courses"
];
var experienceDocuments = [
    "soft_skills",
    "technical_skills",
    "work_experience"
];
var educationListItem = /** @class */ (function () {
    function educationListItem(courseCode, courseName, courseURL) {
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.courseURL = courseURL;
    }
    educationListItem.prototype.getCode = function () {
        return this.courseCode;
    };
    educationListItem.prototype.getName = function () {
        return this.courseName;
    };
    educationListItem.prototype.getURL = function () {
        return this.courseURL;
    };
    return educationListItem;
}());
var experienceListItem = /** @class */ (function () {
    function experienceListItem(title, par) {
        this.title = title;
        this.par = par;
    }
    experienceListItem.prototype.getTitle = function () {
        return this.title;
    };
    experienceListItem.prototype.getPar = function () {
        return this.par;
    };
    return experienceListItem;
}());
$(document).ready(function () {
    // Load default page or last loaded page.
    if (!sessionStorage.getItem(sesVar.currPg)) {
        sessionStorage.setItem(sesVar.currPg, "home");
    }
    $(con.page).load(p.html + sessionStorage.getItem(sesVar.currPg) + p.ext);
    // Menu buttons load the and update the current page.
    $("button").click(function () {
        var xhttp = new XMLHttpRequest();
        var page = p.html + this.id + p.ext;
        var pageID = this.id;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                $(con.page).html(this.responseText);
                sessionStorage.setItem(sesVar.currPg, pageID);
                loadPageElements(pageID);
            }
        };
        xhttp.open("GET", page, true);
        xhttp.send();
    });
    // Load the page elements.
    loadPageElements(sessionStorage.getItem(sesVar.currPg));
    // Handles when a select element changes.
    $(document).on("change", "select", function () {
        switch (this.id) {
            case "education_select":
                var index = this.value;
                loadEducationTable(educationDocuments[index]);
                sessionStorage.setItem(sesVar.currEdTab, index);
                break;
            case "experience_select":
                var index = this.value;
                loadExperienceList(experienceDocuments[index]);
                sessionStorage.setItem(sesVar.currExList, index);
                break;
            default:
                alert("Could not find any actions to perform for: " + this.id);
                break;
        }
    });
});
// Loads elements when a page is first loaded.
function loadPageElements(page) {
    var index;
    switch (page) {
        case "education":
            // Check if a table has been loaded previously.
            if (!sessionStorage.getItem(sesVar.currEdTab)) {
                sessionStorage.setItem(sesVar.currEdTab, "0");
            }
            index = parseInt(sessionStorage.getItem(sesVar.currEdTab));
            if (index > educationDocuments.length) {
                alert("That table could not be loaded. Loading the default table.");
                index = 0;
            }
            // Set the select value.
            $("#education_select").val(index);
            // Load the default or last loaded table.
            loadEducationTable(educationDocuments[index]);
            break;
        case "experience":
            if (!sessionStorage.getItem(sesVar.currExList)) {
                sessionStorage.setItem(sesVar.currExList, "0");
            }
            index = parseInt(sessionStorage.getItem(sesVar.currExList));
            if (index > experienceDocuments.length) {
                alert("Could not find the desired list.");
                index = 0;
            }
            $("#experience_select").val(index);
            //Load the experience list.
            loadExperienceList(experienceDocuments[index]);
            break;
        case "home":
        case "interests":
        case "projects":
            break;
        default:
            alert("Could not load the items for the page.");
            break;
    }
}
// Creates and loads the education table cased on the document passed.
function loadEducationTable(docName) {
    var xhttp = new XMLHttpRequest();
    var docPath = p.doc + docName + ".txt";
    xhttp.onreadystatechange = function () {
        if (this.readyState == 1)
            $(con.eduTab).html("");
        // When the response completes load the table.
        if (this.readyState == 4 && this.status == 200) {
            var text = this.responseText.split("\r\n");
            var items = [];
            var str = "";
            // Create educationListItems to be sorted.
            // i is the course code.
            // i+1 is the course name.
            // i+2 is the URL to the academic calendar.
            for (var i = 0; i < text.length; i = i + 4)
                items.push(new educationListItem(text[i], text[i + 1], text[i + 2]));
            items.sort(function (a, b) {
                if (a.getName() > b.getCode())
                    return 1;
                if (a.getName() < b.getCode())
                    return -1;
                return 0;
            });
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                str += "<tr><td><a href=\"" + item.getURL() + "\">";
                str += item.getCode() + "</td>";
                str += "<td>" + item.getName() + "</td></tr>";
            }
            $(con.eduTab).append(str);
        }
        // If the table can't be found alert the user.
        if (this.readyState == 4 && this.status == 404 || this.status == 403)
            alert("Could not load: " + docName);
    };
    xhttp.open("GET", docPath, true);
    xhttp.send();
}
function loadExperienceList(docName) {
    var xhttp = new XMLHttpRequest();
    var docPath = p.doc + docName + ".txt";
    xhttp.onreadystatechange = function () {
        if (this.readyState == 1)
            $(con.expList).html("");
        //Parse document and insert the formatted text.
        if (this.readyState == 4 && this.status == 200) {
            var text = this.response.split("\r\n");
            var items = [];
            var str = "";
            var title = "";
            var par = "";
            //Parse the text.
            for (var i = 0; i < text.length; i++) {
                title = text[i];
                i++;
                while (text[i] != "" && i < text.length) {
                    par += text[i];
                    i++;
                }
                items.push(new experienceListItem(title, par));
                title = "";
                par = "";
            }
            //Sort by the title.
            items.sort(function (a, b) {
                if (a.getTitle() > b.getTitle())
                    return 1;
                if (a.getTitle() < b.getTitle())
                    return -1;
                return 0;
            });
            for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
                var item = items_2[_i];
                str += "<h1>" + item.getTitle() + "</h1>";
                str += "<p>" + item.getPar() + "</p>";
            }
            $(con.expList).html(str);
        }
        if (this.readyState == 4 && this.status == 404 || this.status == 403)
            alert("Could not load: " + docName);
    };
    xhttp.open("GET", docPath, true);
    xhttp.send();
}
