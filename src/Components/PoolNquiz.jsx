import  { useState } from 'react';
import swal from 'sweetalert';

const QuizSection = () => {
  // eslint-disable-next-line no-unused-vars
  const [quizData, setQuizData] = useState([
    {
      question: "1. What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: 0,
    },
    {
      question: "2. Which planet is known as the Red Planet?",
      options: ["Earth", "Venus", "Mars", "Jupiter"],
      correctAnswer: 2,
    },
    {
      question: "3. What is the largest mammal on Earth?",
      options: ["Giraffe", "Elephant", "Blue Whale", "Lion"],
      correctAnswer: 2,
    },
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleQuizSubmit = () => {
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
    
      swal("Correct Answer!", "Well done!", "success");

      if (currentQuestion < quizData.length - 1) {
      
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        
        swal("Congratulations!", "You've won a surprise reward!", "success");
      }
    } else {
      
      swal("Incorrect Answer", "Please try again.", "error");
    }
  };

  return (
  <div>
    <h1 className='text-4xl text-center my-20'>Quiz Game</h1>
      <div className="quiz-section flex flex-col my-10 lg:flex-row justify-center items-center gap-32 text-white p-6 rounded-lg shadow-lg">
       <div className='flex flex-1'>
       <img className='mr-5' src="https://i.ibb.co/tHt3xgy/q-a-removebg-preview.png" alt="" />
        <div className="border-l-4 border-black">
  </div>
       </div>
     <div className='flex-1'>
     
      {currentQuestion < quizData.length && (
        <div className="quiz-question mb-4">
          <p className="text-lg text-black mb-5 font-semibold">{quizData[currentQuestion].question}</p>
          <ul className="options-list">
            {quizData[currentQuestion].options.map((option, optionIndex) => (
              <li
                key={optionIndex}
                className={`option p-2 rounded-md mb-2 text-black hover:text-white hover:bg-black border-2 border-black cursor-pointer ${
                  selectedOption === optionIndex ? 'bg-blue-400 text-black' : 'bg-gray-60'
                }`}
                onClick={() => handleOptionSelect(optionIndex)}
              >
                {option}
              </li>
            ))}
          </ul>
          <button
            onClick={handleQuizSubmit}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:font-semibold hover:border-black hover:border-2  mt-4"
          >
            Submit
          </button>
        </div>
      )}
     </div>
    </div>
  </div>
  );
};

export default QuizSection;
