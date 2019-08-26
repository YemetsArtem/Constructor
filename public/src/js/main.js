import Survey from "./survey.js";
import "../css/style.scss";

window.onload = () => {
  const container = document.querySelector(".survey-container");
  const survey = new Survey(container);
  survey.create();
};
