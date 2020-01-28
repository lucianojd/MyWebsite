function change_container_contents(id, page_num) {
    var path = "assets/pages/";
    var page_list = [
        path + "home.html",
        path + "education.html",
        path + "skills.html",
        path + "projects.html",
        path + "menu.html"
    ];
    $(id).load(page_list[page_num]);
    // Don't save the page if it's the menu.
    if (page_num == 4) {
        return;
    }
    localStorage.setItem("currentPage", page_num.toString());
}
function determine_page_to_load(id) {
    var page_num = +localStorage.getItem("currentPage");
    // Set the current page to the home page if no page is set.
    if (!page_num) {
        change_container_contents(id, 0);
        return;
    }
    change_container_contents(id, page_num);
}
function load_menu() {
    change_container_contents("#menu-container", 4);
}
