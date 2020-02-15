import { Page } from "./Page.js";

//Create section names for loading pages.
var container = {
    menu:"#menu-container", 
    page:"#page-container"
}

//Create pages.
var pageList: Map<string, Page> = new Map<string, Page>();
pageList.set("education", new Page("education", "/html/education.html", new Map<string, string>()));
pageList.set("home", new Page("home", "/html/home.html", new Map<string, string>()));
pageList.set("interests", new Page("interests", "/html/interests.html", new Map<string, string>()));
pageList.set("menu", new Page("menu", "/html/menu.html", new Map<string, string>()));
pageList.set("projects", new Page("projects", "/html/projects.html", new Map<string, string>()));
pageList.set("skills", new Page("skills", "/html/skills.html", new Map<string, string>()));

//Add documents to pages.
pageList.get("education").addDocument("ufv", "/resources/data/ufv_courses.json");
pageList.get("education").addDocument("uvic", "/resources/data/uvic_courses.json");

pageList.get("skills").addDocument("soft", "/resources/data/soft_skills.txt");
pageList.get("skills").addDocument("technical", "/resources/data/technical_skills.txt");

//Global functions.
export function init(): void {
    //Load menu.
    loadMenu();

    //Load home page if first visit.
    loadPage(container.page, null);
}

export function checkButtons(): void {
    $("button").click(function () {
        switch(this.id) {
            case "education": 
            case "home":
            case "interests":
            case "projects":
            case "skills":
                loadPage(container.page, this.id);
            break;

            default:
                console.log("\"" + this.id + "\" is an unknown button.");
            break;
        }
    });
}

export function watchDropDown(ctrlLocation: string): void {
    $("select").change(function () {
           console.log($(this).val());
    })
}

function loadPage(containerId: string, page: string): boolean {
    if(page && !pageList.has(page)) {
        return false;
    }

    var sessionStrVar: string = "currentPage";
    var defaultPage: string = "home";
    var currPg: string = sessionStorage.getItem(sessionStrVar);

    if(!page && !currPg) {
        $(containerId).load(pageList.get(defaultPage).getURL());
        sessionStorage.setItem(sessionStrVar, defaultPage);
        return true;
    }

    if(!page) {
        $(containerId).load(pageList.get(currPg).getURL())
        return true;
    }

    $(containerId).load(pageList.get(page).getURL());
    sessionStorage.setItem(sessionStrVar, page);
    return true;
}

function loadMenu(): boolean {
    if(!pageList.get("menu")) {
        return false;
    }

    $(container.menu).load(pageList.get("menu").getURL());
}