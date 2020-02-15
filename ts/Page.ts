export class Page {
    private name: string;
    private URL: string;
    private documents: Map<string, string>;

    constructor(name: string, URL: string, documents: Map<string, string>) {
        this.name = name;
        this.URL = URL;
        this.documents = documents;
    }

    getName(): string {
        return this.name;
    }

    getURL(): string {
        return this.URL;
    }

    addDocument(key: string, path: string): boolean {
        if(this.documents.has(key)) {
            return false;
        }

        this.documents.set(key, path);
        return true;
    }

    removeDocument(key: string): boolean {
        return this.documents.delete(key);
    }

    getDocument(key: string): string {
        return this.documents.get(key);
    }

    getDocumentList(): Map<string, string> {
        return this.documents;
    }
}