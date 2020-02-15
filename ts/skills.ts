function import_skills(id: string): void {
    $.get("assets/sub-pages/skills_page/text/technical_skills.txt", function (data) {
        console.log(data);
    })
}

function check_buttons_skills(): void {
    $("button").click(function () {
        import_skills(this.id);
    })
}