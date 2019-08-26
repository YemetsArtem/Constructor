import { insert, changeState, toHtml, deleteEvents } from "./handlers.js";
import Question from "./question.js";
import surveyTemplate from "../templates/survey.html";

class Survey {
  constructor(container) {
    this.container = container;
    this.survey = toHtml(surveyTemplate);
  }

  create() {
    const createBtn = document.querySelector("#createBtn");
    const createSurvey = () => {
      const survey = this.survey.cloneNode(true);
      changeState(createBtn, createSurvey, "In processіng...");
      insert(this.container, survey);
      this.questionCreator();
      this.save();
      this.delete(survey, createBtn, createSurvey);
    };
    createBtn.addEventListener("click", createSurvey);
  }

  delete(elem, btn, cb) {
    const deleteSurvey = (e, resolve) => {
      e.preventDefault();
      elem.remove();
      resolve();
    };
    const promise = new Promise(resolve =>
      deleteBtn.addEventListener("click", e => deleteSurvey(e, resolve))
    );
    promise.then(() => changeState(btn, cb, "Create new Survey"));
  }

  save() {
    const saveSurvey = e => {
      e.preventDefault();
      const inputs = document.querySelectorAll(".form-control");
      inputs.forEach(elem => console.log(elem.value));
    };
    saveBtn.addEventListener("click", saveSurvey);
  }

  questionCreator() {
    let count = 1;
    const questionContainer = document.getElementById("questions");
    const addQuestion = e => {
      e.preventDefault();
      const question = new Question(questionContainer);
      question.create(count);
      count++;
    };
    addQuestionBtn.addEventListener("click", addQuestion);
  }
}

export default Survey;
