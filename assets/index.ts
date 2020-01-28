function change_container_contents(id: string, page_num: number): void {
    var path: string ="assets/pages/";
    
    var page_list: string[] = [
        path + "home.html",
        path + "education.html",
        path + "skills.html",
        path + "projects.html",
        path + "menu.html"
    ];

    $(id).load(page_list[page_num]);

    // Don't save the page if it's the menu.
    if(page_num == 4) { return; }

    localStorage.setItem("currentPage", page_num.toString());
}

function determine_page_to_load(id: string): void {
    let page_num: number = +localStorage.getItem("currentPage");

    // Set the current page to the home page if no page is set.
    if(!page_num) {
        change_container_contents(id, 0);
        return;
    }
    
    change_container_contents(id, page_num);
}

function load_menu(): void {
    change_container_contents("#menu-container", 4);
}