var Page = /** @class */ (function () {
    function Page(name, URL, documents) {
        this.name = name;
        this.URL = URL;
        this.documents = documents;
    }
    Page.prototype.getName = function () {
        return this.name;
    };
    Page.prototype.getURL = function () {
        return this.URL;
    };
    Page.prototype.addDocument = function (key, path) {
        if (this.documents.has(key)) {
            return false;
        }
        this.documents.set(key, path);
        return true;
    };
    Page.prototype.removeDocument = function (key) {
        return this.documents["delete"](key);
    };
    Page.prototype.getDocument = function (key) {
        return this.documents.get(key);
    };
    Page.prototype.getDocumentList = function () {
        return this.documents;
    };
    return Page;
}());
export { Page };
