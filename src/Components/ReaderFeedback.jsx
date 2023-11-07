import { useState } from 'react';
import swal from 'sweetalert';

const ReaderFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(''); 
  const [isAnonymous, setIsAnonymous] = useState(false); 
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleAnonymousToggle = () => {
    setIsAnonymous(!isAnonymous);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const feedbackMessage = `Feedback: ${feedback}`;
    const emojiMessage = `Emoji: ${selectedEmoji}`;
    const anonymityMessage = `Anonymous: ${isAnonymous ? 'Yes' : 'No'}`;
    const categoryMessage = `Category: ${selectedCategory}`;

    const message = `${feedbackMessage}\n${emojiMessage}\n${anonymityMessage}\n${categoryMessage}`;

    

    swal({
        title: 'Feedback Submitted',
        text: message,
        icon: 'success',
      });

  };

  return (
   <div className='mb-10'>
     <h1 className='text-4xl text-center mt-20 mb-5'>Reader Feedback</h1>
     <div className="border-b-4 text-center w-72 mb-20 mx-auto border-black">
  </div>
     <div className="reader-feedback-container flex lg:flex-row-reverse  flex-col justify-center items-center  p-4  rounded-lg shadow-lg">
   <div className='flex flex-row-reverse flex-1'>
   <img src="https://i.ibb.co/tzhByZC/feedback.png" alt="" />
    <div className="border-r-4 border-black ml-5">
  </div>
   </div>
     <div className='flex-1 '>
    
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className=" text-gray-600 text-lg mb-4 font-medium" htmlFor="feedback">
            Your Feedback
          </label>
          <textarea
            id="feedback"
            name="feedback"
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Type your feedback here"
            className="w-full px-4 py-2 border border-black rounded-lg mt-4 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-lg font-medium mb-2">Select an Emoji</label>
          <div className="flex text-2xl space-x-4">
            {['😃', '🤔', '😡', '😍'].map((emoji) => (
              <button
                key={emoji}
                type="button"
                className={`emoji-button ${selectedEmoji === emoji ? 'selected' : ''}`}
                onClick={() => handleEmojiClick(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-lg font-medium mb-2">Anonymous Feedback</label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="anonymous"
              name="anonymous"
              checked={isAnonymous}
              onChange={handleAnonymousToggle}
              className="rounded  border-black"
            />
            <label htmlFor="anonymous" className="text-gray-600 text-base">Submit anonymously</label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-lg font-medium mb-2" htmlFor="category">
            Select a Category
          </label>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 border border-black rounded-lg shadow-sm focus:ring focus:ring-indigo-200"
          >
            <option value="">Select a category</option>
            <option value="General">General</option>
            <option value="Content Quality">Content Quality</option>
            <option value="User Experience">User Experience</option>
          </select>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:font-semibold hover:border-black hover:border-2  mt-4"
          >
            Submit Feedback
          </button>
        </div>
      </form>
     </div>
    </div>
   </div>
  );
};

export default ReaderFeedback;
