import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [questions, setQuestion] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((questions) => setQuestion(questions));
  }, []);


  /// delete Item

  function handleDeleteItem(deleteItem) {
    const newQuestion = questions.filter(
      (question) => question.id !== deleteItem.id
    );
    setQuestion(newQuestion);
  }


  /// patch request

  function handleItemChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: correctIndex,
      }),
    });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      {/* <ul>display QuestionItem components here after fetching</ul> */}
      <ul>
        {questions.map((item) => (
          <QuestionItem
            key={item.id}
            question={item}
            onItemChange={handleItemChange}
            onDelItem={handleDeleteItem}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
