import { insert, changeState } from "../handlers";
import oneAnswerTemplate from "../../templates/constructor/answer/oneAnswer.html";
import severalAnswersTemplate from "../../templates/constructor/answer/severalAnswer.html";
import openAnswerTemplate from "../../templates/constructor/answer/openAnswer.html";

class Answer {
    constructor(currentQuestion, container, type) {
        this.currentQuestion = currentQuestion;
        this.container = currentQuestion.querySelector(`#${container}`);
        this.type = type;
    }

    add(number, addBtn) {
        switch (this.type) {
            case "one":
                insert(this.container, oneAnswerTemplate);
                const radioBtns = this.currentQuestion.querySelectorAll("#radioBtn");
                radioBtns.forEach(btn => btn.setAttribute("name", `question ${number}`));
                this.remove();
                break;
            case "several":
                insert(this.container, severalAnswersTemplate);
                this.remove();
                break;
            case "open":
                insert(this.container, openAnswerTemplate);
                changeState(addBtn, this.add);
                break;
        }
    };

    remove() {
        const answer = this.currentQuestion.querySelector("#answers").lastChild;
        const removeBtn = answer.querySelector("#removeAnswer");
        removeBtn.addEventListener("click", () => answer.remove());
    };
}

export default Answer;