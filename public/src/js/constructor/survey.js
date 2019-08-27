import { insert, changeState, toHtml } from "../handlers";
import surveyTemplate from "../../templates/constructor/survey.html";
import Question from "./question";
import Page from "../page";
import axios from "axios";

class Survey extends Page {
  constructor(page, container) {
    super(page);
    this.container = document.querySelector(`.${container}`);
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

      const survey = {
        title: document.querySelector("#surveyTitle").value,
        description: document.querySelector("#surveyDesription").value,
        questions: []
      };

      const questions = document.querySelectorAll(".question");
      questions.forEach(currentQuestion => {
        const question = {
          title: currentQuestion.querySelector("#questionTitle").value,
          answers: []
        };
        const answers = currentQuestion.querySelectorAll(".answer");
        answers.forEach(currentAnswer => {
          question.answers.push({
            value: currentAnswer.querySelector(".form-control").value,
            checked: currentAnswer.querySelector(".state").checked
          })
        });
        survey.questions.push(question);
      });

      axios.post('http://localhost:3000/survey', survey)
    };

    saveBtn.addEventListener("click", saveSurvey);
  }

  questionCreator() {
    let questionNumber = 1;
    const addQuestion = e => {
      e.preventDefault();
      const question = new Question("questions");
      question.create(questionNumber++);
    };
    addQuestionBtn.addEventListener("click", addQuestion);
  }
}

export default Survey;