export function getDoc(document) {
    return buildDoc(document);
}
function buildDoc(document) {
    var htmlString;
    var docList = new Map();
    //Documents for education.html.
    docList.set("UVic", "/resources/data/uvic_courses.json");
    docList.set("UFV", "/resources/data/ufv_courses.json");
    switch (document) {
        case "UVic":
        case "UFV":
            return buildEducationTable(docList.get(document));
        default:
            console.log("Unknown document requested: " + document);
    }
    return null;
}
function buildEducationTable(doc) {
    var htmlString = "";
    console.log(htmlString);
    return htmlString;
}
