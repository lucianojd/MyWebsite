//Global variables.
var container = {
    menu: "#menu-container",
    page: "#page-container"
};
var pageList = {
    "home": "assets/sub-pages/home_page/home.html",
    "education": "assets/sub-pages/education_page/education.html",
    "skills": "assets/sub-pages/skills_page/skills.html",
    "interests": "assets/sub-pages/interests_page/interests.html",
    "projects": "assets/sub-pages/projects_page/projects.html",
    "menu": "assets/menu-container/menu.html"
};
//Global functions.
function import_page(id, page) {
    //Load the page.
    $(id).load(pageList[page]);
    // Don't save the page if it's the menu.
    if (page == "menu") {
        return;
    }
    localStorage.setItem("currentPage", page);
}
function load_page() {
    var page = localStorage.getItem("currentPage");
    // Set the current page to the home page if no page is set.
    if (!page) {
        page = "home";
    }
    import_page(container.page, page);
}
function load_menu() {
    import_page(container.menu, "menu");
}
function check_buttons() {
    $("button").click(function () {
        import_page(container.page, this.id);
    });
}
