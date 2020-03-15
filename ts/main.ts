// Set up page.
$(document).ready(function () {
    var trgts = {
        menu: "#menu-container",
        page: "#page-container"
    }
    
    var sesStrVar = {
        currPg: "currentPage",
    }
    
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
        pgLoadFuncSelector(this.id);
    });

    //  Load the last page open.
    var defaultPage: string = "home";

    if(!sessionStorage.getItem(sesStrVar.currPg)) {
        sessionStorage.setItem(sesStrVar.currPg, defaultPage);
    }

    var currentPage = sessionStorage.getItem(sesStrVar.currPg);
    $(trgts.page).load(htmlPath + currentPage + ".html");
})

// Used to grab a function to execute when loading a page.
function pgLoadFuncSelector(pgName: string): void {
    switch(pgName) {
        case "home":
            break;

        case "education":
            break;

        default:
            // Do nothing.
            break;
    }
}