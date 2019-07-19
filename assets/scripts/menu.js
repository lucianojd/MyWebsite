function fillWindow(id, page) {
    var page = '<embed src=' + page + '>';
    document.getElementById(id).innerHTML=page;
}