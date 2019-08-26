import { insert, changeState, toHtml, deleteEvents } from "./handlers.js";
import oneAnswerTemplate from "../templates/answer/oneAnswer.html";
import severalAnswerTemplate from "../templates/answer/severalAnswer.html";
import openAnswerTemplate from "../templates/answer/openAnswer.html";
import questionTemplate from "../templates/question/question.html";
import questionTypeTemplate from "../templates/question/question_type.html";

class Question {
  constructor(container) {
    this.container = container;
    this.question = toHtml(questionTemplate);
  }

  create(count) {
    const promise = this.chooseType();
    promise.then(question => {
      insert(question.container, this.question);
      this.changeTitle(question.container, question.title, count);
      this.remove(question.container);
      this.answerCreator(question.container, question.type, count);
    });
  }

  changeTitle(question, title, count) {
    const questionTitle = question.querySelector(".question_container h3");
    questionTitle.innerHTML = `Question  ${count} <br> <small>(${title})</small>`;
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
        resolve({ type: "open", container: question, title: "Enter answer" });
      };
    });
  }

  answerCreator(currentQuestion, type, count) {
    const answersContainer = currentQuestion.querySelector("#answers");
    const addBtn = currentQuestion.querySelector("#addAnswerBtn");

    const removeAnswer = () => {
      const answer = currentQuestion.querySelector("#answers").lastChild;
      const removeBtn = answer.querySelector("#removeAnswer");
      removeBtn.addEventListener("click", () => answer.remove());
    };

    const addAnswer = e => {
      e.preventDefault();
      switch (type) {
        case "one":
          insert(answersContainer, oneAnswerTemplate);
          const radioBtns = currentQuestion.querySelectorAll("#radioBtn");
          radioBtns.forEach(btn =>
            btn.setAttribute("name", `question ${count}`)
          );
          removeAnswer();
          break;
        case "several":
          insert(answersContainer, severalAnswerTemplate);
          removeAnswer();
          break;
        case "open":
          insert(answersContainer, openAnswerTemplate);
          changeState(addBtn, addAnswer);
          break;
      }
    };

    addBtn.addEventListener("click", addAnswer);
  }
}

export default Question;
