// Set up page.
$(document).ready(function () {
    var trgts = {
        menu: "#menu-container",
        page: "#page-container"
    };
    var sesStrVar = {
        currPg: "currentPage"
    };
    var htmlPath = "html/";
    // Load menu and add button functionality.
    $(trgts.menu).load("html/menu.html");
    // Setup menu buttons.
    $(trgts.menu).on("click", "button", function () {
        var URL = htmlPath + this.id + ".html";
        // Setup the button to load the page.
        $(trgts.page).load(URL);
        sessionStorage.setItem(sesStrVar.currPg, this.id);
        // Attach a page loading function to the button.
        pageLoadFunctionSelector(this.id);
    });
    //  Load the last page open.
    var defaultPage = "home";
    if (!sessionStorage.getItem(sesStrVar.currPg)) {
        sessionStorage.setItem(sesStrVar.currPg, defaultPage);
    }
    var currentPage = sessionStorage.getItem(sesStrVar.currPg);
    $(trgts.page).load(htmlPath + currentPage + ".html");
});
// Used to grab a function to execute when loading a page.
function pageLoadFunctionSelector(pgName) {
    switch (pgName) {
        case "education":
            loadEducation();
            break;
        case "home":
            loadHome();
            break;
        case "interests":
            loadInterests();
            break;
        case "projects":
            loadProjects();
            break;
        case "skills":
            loadSkills();
            break;
        default:
            // Do nothing.
            break;
    }
}
function loadEducation() {
}
function loadHome() {
}
function loadInterests() {
}
function loadProjects() {
}
function loadSkills() {
}
