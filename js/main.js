import { Page } from "./Page.js";
//Create section names for loading pages.
var container = {
    menu: "#menu-container",
    page: "#page-container"
};
//Names of localStorage variables.
var lclStrVar = {
    currPg: "currentPage",
    currEduTbl: "currentEducationTable"
};
//Create pages.
var pageList = new Map();
pageList.set("education", new Page("education", "/html/education.html", new Map()));
pageList.set("home", new Page("home", "/html/home.html", new Map()));
pageList.set("interests", new Page("interests", "/html/interests.html", new Map()));
pageList.set("menu", new Page("menu", "/html/menu.html", new Map()));
pageList.set("projects", new Page("projects", "/html/projects.html", new Map()));
pageList.set("skills", new Page("skills", "/html/skills.html", new Map()));
//Add documents to pages.
pageList.get("education").addDocument("ufv", "/resources/data/ufv_courses.json");
pageList.get("education").addDocument("uvic", "/resources/data/uvic_courses.json");
pageList.get("skills").addDocument("soft", "/resources/data/soft_skills.txt");
pageList.get("skills").addDocument("technical", "/resources/data/technical_skills.txt");
//Global functions.
export function init() {
    //Load menu.
    loadPage(container.menu, "menu");
    //Load home page if first visit.
    if (!sessionStorage.getItem(lclStrVar.currPg)) {
        loadPage(container.page, "home");
        sessionStorage.setItem(lclStrVar.currPg, "home");
    }
    else {
        loadPage(container.page, sessionStorage.getItem(lclStrVar.currPg));
    }
}
export function checkButtons() {
    $("button").click(function () {
        loadPage(container.page, this.id);
        sessionStorage.setItem(lclStrVar.currPg, this.id);
    });
}
function loadPage(containerId, page) {
    if (!pageList.has(page)) {
        return false;
    }
    $(containerId).load(pageList.get(page).getURL());
    return true;
}
