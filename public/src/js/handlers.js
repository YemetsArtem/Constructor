const insert = (parent, child) => {
  typeof child === "string"
    ? parent.insertAdjacentHTML("beforeend", child)
    : parent.append(child);
}

const toHtml = (string) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = string.trim();
  return wrapper.firstChild;
}

const changeState = (elem, fn, string) => {
  elem.classList.toggle("disable");
  elem.classList.value === "disable"
    ? (elem.removeEventListener("click", fn), (elem.innerHTML = string))
    : (elem.addEventListener("click", fn), (elem.innerHTML = string));
}

const deleteEvents = (elem) => {
  elem.forEach((old_element, index) => {
    const new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
  })
}


export { insert, changeState, toHtml, deleteEvents };