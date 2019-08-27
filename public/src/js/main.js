import "../css/style.scss";
import 'bootstrap';
import {insert} from "./handlers";
import constructorTemplate from "../templates/constructor/constructor.html";
import homeTemplate from "../templates/home/home.html";
import Survey from "./constructor/survey";
import Page from "./page";
import axios from "axios";


window.onload = () => {
  const main = document.querySelector(".main");
  insert(main, constructorTemplate);
  insert(main, homeTemplate);
  
  // Create pages instance
  const pages = {
    home: new Page("home"),
    constructor: new Survey("constructor", "survey-container")
  };

  // Add events on Tab buttons
  for (let key in pages) pages[key].bindTab();

  // Default
  pages.home.show();
  pages.constructor.create();


  homeTab.onclick = () => {
    axios.get("http://localhost:3000/survey").then((res) => {
      const surveys = res.data;
      console.log(surveys);
    })
  }

};