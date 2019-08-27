import { insert, toHtml } from "../handlers";
import questionTemplate from "../../templates/constructor/question/question.html";
import questionTypeTemplate from "../../templates/constructor/question/question_type.html";
import Answer from "./answer";

class Question {
  constructor(container) {
    this.container = document.getElementById(`${container}`);
    this.question = toHtml(questionTemplate);
  }

  create(number) {
    const promise = this.chooseType();
    promise.then(question => {
      insert(question.container, this.question);
      this.remove(question.container);
      this.changeTitle(question.container, question.title, number);
      this.answerCreator(question.container, question.type, number);
    });
  }

  changeTitle(question, title, number) {
    const questionTitle = question.querySelector(".question_container h3");
    questionTitle.innerHTML = `Question  ${number} <br> <small>(${title})</small>`;
  }

  remove(question) {
    const removeBtn = question.querySelector("#removeQuestion");
    removeBtn.addEventListener("click", () => question.remove());
  }

  chooseType() {
    insert(this.container, questionTypeTemplate);
    const question = document.querySelector("#questions").lastChild;
    const questionType = question.querySelector(".question_type");
    const one = question.querySelector("#one");
    const several = question.querySelector("#several");
    const text = question.querySelector("#text");

    return new Promise(resolve => {
      one.onclick = e => {
        e.preventDefault();
        questionType.remove();
        resolve({
          type: "one",
          container: question,
          title: "Question with one right answer"
        });
      };
      several.onclick = e => {
        e.preventDefault();
        questionType.remove();
        resolve({
          type: "several",
          container: question,
          title: "Question with one or more right answers"
        });
      };
      text.onclick = e => {
        e.preventDefault();
        questionType.remove();
        resolve({
          type: "open",
          container: question,
          title: "Enter answer"
        });
      };
    });
  }

  answerCreator(currentQuestion, type, number) {
    const addBtn = currentQuestion.querySelector("#addAnswerBtn");

    addBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const answer = new Answer(currentQuestion, "answers", type);
      answer.add(number, addBtn);
    });
  }
}

export default Question;