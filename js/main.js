import { createEducationTable } from "./utils.js";
// Global variables
var trgts = {
    menu: "#menu-container",
    page: "#page-container"
};
var sesStrVar = {
    currPg: "currentPage",
    currEdTab: "currentEducationTable",
    currExList: "currentExperienceList"
};
var path = {
    html: "/html/"
};
// Set up page.
$(document).ready(function () {
    // Load menu.
    $(trgts.menu).load(path.html + "menu.html");
    //  Load the last page open.
    var defaultPage = "home";
    if (!sessionStorage.getItem(sesStrVar.currPg)) {
        sessionStorage.setItem(sesStrVar.currPg, defaultPage);
    }
    var currentPage = sessionStorage.getItem(sesStrVar.currPg);
    $(trgts.page).load(path.html + currentPage + ".html");
});
// Handle button presses.
export function buttonHandler(button) {
    switch (button.id) {
        case "education":
        case "experience":
        case "home":
        case "interests":
        case "projects":
            // Load and store the page as the current page.
            var page = path.html + button.id + ".html";
            $(trgts.page).load(page);
            sessionStorage.setItem(sesStrVar.currPg, button.id);
            break;
        default:
            alert("That button is not currently working. Please try another.");
            break;
    }
}
// Handle select changes.
export function handleSelectChange(select, ttlID, itemID) {
    // Get name and value of selected item.
    var currValue = select.value;
    var currName = $("#" + select.id + " :selected").text();
    // Determine which select item it is.
    switch (select.id) {
        case "education_select":
            // Get the select specific information.
            var sesStorage = sesStrVar.currEdTab;
            var ttlString = "Courses completed at ";
            // Load the education table.
            createEducationTable(currValue, function (htmlString) {
                $(itemID).html(htmlString);
            });
            break;
        default:
            alert("Item could not be loaded. Make another selection");
            break;
    }
    // Set title.
    $(ttlID).text(ttlString + currName);
    //Set session storage.
    sessionStorage.setItem(sesStorage, currValue);
}
export function handleSelectOnReady(selectID, ttlID, itemID) {
    switch (selectID) {
        case "#education_select":
            var sesStorage = sesStrVar.currEdTab;
            var ttlString = "Courses completed at ";
            break;
        case "#experience_select":
            var sesStorage = sesStrVar.currExList;
            var ttlString = "";
            break;
        default:
            alert("Could not load previous item.");
            return;
    }
    // Check for last loaded item.
    var currItem = sessionStorage.getItem(sesStorage);
    // Set default item if none is present.
    if (!currItem) {
        currItem = $(selectID).val();
        sessionStorage.setItem(sesStorage, currItem);
    }
    // Switch select to current item.
    $(selectID).val(currItem);
    // Set title.
    $(ttlID).text(ttlString + $(selectID + " :selected").text());
    // Create the item.
    switch (selectID) {
        case "#education_select":
            createEducationTable(currItem, function (htmlString) {
                $(itemID).html(htmlString);
            });
    }
}
// Functions attach functions to controls specific to each page.
function loadEducation() {
    // Change table contents when the drop down changes.
    $(document).on("change", "select: #education_select", function () {
        // Grabs vurrent selections value.
        var currSelection = $(this).val();
        // Grabs text of the current selection.
        var currName = $("#" + this.id + " :selected").text();
        // Fill the table.
        createEducationTable(currSelection, function (htmlString) {
            $("#course_table").html(htmlString);
        });
        // Set title.
        $("#education_title").text("Courses completed at " + currName);
        // Set the session storage for the education table.
        sessionStorage.setItem("currentEducationTable", currName);
    });
}
