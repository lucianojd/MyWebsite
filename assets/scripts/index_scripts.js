function change_container_contents(id, page_num) {
    var page_list = [
        "assets/html_pages/home_page.html",
        "assets/html_pages/education_page.html",
        "assets/html_pages/skills_page.html",
        "assets/html_pages/projects_page.html",
        "assets/html_pages/menu.html"
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
