import React from "react";

function QuestionItem({ question, onDelItem, onItemChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

    // create delete request
  function handleDelClick(e) {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDelItem(question));
  }
  /// patch request handler
  function handleChange(e) {
    onItemChange(id, e.target.value);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          defaultValue={correctIndex}
          onChange={handleChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
