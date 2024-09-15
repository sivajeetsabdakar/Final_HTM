'use client'
import { useState } from 'react';
import QC from '../../../../component/QC';
import Uploadfile from '../../../../component/UploadFile';

export default function Home() {
  const [paragraph, setParagraph] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [message, setMessage] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleInputChange = (e) => {
    setParagraph(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting paragraph:", paragraph);

    try {
      const response = await fetch('http://127.0.0.1:5000/Jee_Physics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: paragraph }),
      });

      console.log("Response received:", response);

      const data = await response.json();
      console.log("Parsed JSON data:", data);

      if (data.suggestions) {
        setSuggestions(data.suggestions);
        setMessage('');
      } else {
        setSuggestions([]);
        setMessage(data.message || 'No related data found');
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setMessage('An error occurred while fetching suggestions.');
    }
  };

  const shiftToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Uploadfile subj={"Jp"} />

      <h1 className='text-center self-center'>Text Suggestions</h1>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center">
        <textarea
          value={paragraph}
          onChange={handleInputChange}
          placeholder="Enter a paragraph..."
          rows={6}
          className="text-white mt-7 self-center"
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          required
        />
        <button
          type="submit"
          className="self-center text-white bg-blue-500 px-8 py-4 rounded-xl"
          style={{ marginTop: '10px', padding: '10px 20px' }}
        >
          Get Suggestions
        </button>
      </form>

      {message && <p style={{ marginTop: '20px', color: 'red' }}>{message}</p>}

      {suggestions.length > 0 && currentQuestionIndex < suggestions.length-1 && (
        <div style={{ marginTop: '20px' }}>
          <strong>Question: {currentQuestionIndex + 1}</strong>
          <QC
            ans={suggestions[currentQuestionIndex].ans}
            index={currentQuestionIndex}
            shift={shiftToNextQuestion}
            imageSrc={suggestions[currentQuestionIndex].image}
          />
        </div>
      )}
    </div>
  );
}
