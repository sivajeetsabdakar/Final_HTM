'use client';
import { useState } from 'react';
import axios from 'axios';
import Uploadfile from '../../../../component/UploadFile';
import Image from 'next/image';
import QC from '../../../../component/QC';

export default function SendParagraph() {
  const [paragraph, setParagraph] = useState('');
  const [response, setResponse] = useState({ ans: [], quetion_Image: [] });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { paragraph: paragraph };
      const res = await axios.post('http://127.0.0.1:5000/Jee_Maths', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // If the response has a result, update the response state
      setResponse(res.data.result || { ans: [], quetion_Image: [] });
    } catch (error) {
      console.error('Error sending paragraph:', error);
      setResponse({ ans: [], quetion_Image: [] });
    }
  };
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const shiftToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
  return (
    <div className='flex flex-col justify-center'>
      {/* Upload file component */}
      <Uploadfile subj={"Jm"} />

      {/* Title */}
      <h1 className='self-center'>Send Paragraph</h1>

      {/* Paragraph input form */}
      <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
        <textarea
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
          rows="10"
          cols="50"
          className="text-white self-center mt-10"
          placeholder="Enter your paragraph here..."
          required
        />
        <br />
        <button type="submit" className='bg-blue-500 px-10 py-5 rounded-lg active:scale-95 w-fit self-center text-white mb-10'>
          Send
        </button>
      </form>

     

      {/* Displaying Question Images */}
      {response.quetion_Image.length > 0 && (
        <div className='mt-5 flex self-center flex-col justify-center'>
          {response.quetion_Image.map((imgSrc, index) => (
           <>
           
            <QC
            ans={response.ans[index]}
            index={currentQuestionIndex}
            shift={shiftToNextQuestion}
            imageSrc={imgSrc}
          />
           </>
            
          ))}
        </div>
      )}
    </div>
  );
}
