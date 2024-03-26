import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';

const AddQuestionModal = ({ open, handleClose }) => {
  const [questionTitle, setQuestionTitle] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']); // Initial empty answers
  const [createdAt, setCreatedAt] = useState(new Date().toISOString());
  const [updatedAt, setUpdatedAt] = useState(new Date().toISOString());

  const handleAddAnswer = () => {
    setAnswers(prevAnswers => [...prevAnswers, '']);
  };

  const handleAnswerChange = (index, event) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleQuestionTitleChange = (event) => {
    setQuestionTitle(event.target.value);
  };

  const handleSaveQuestion = () => {
    // Perform actions to save the question with its answers
    const newQuestion = {
      id: uuidv4(),
      title: questionTitle,
      answers: answers,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };
    console.log('New question:', newQuestion);
    handleClose(); // Close the modal after saving
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="modal">
        <h2 id="modal-title">Add New Question</h2>
        <TextField
          label="Question Title"
          value={questionTitle}
          onChange={handleQuestionTitleChange}
        />
        {answers.map((answer, index) => (
          <TextField
            key={index}
            label={`Answer ${index + 1}`}
            value={answer}
            onChange={(event) => handleAnswerChange(index, event)}
          />
        ))}
        <Button variant="contained" onClick={handleAddAnswer}>Add Answer</Button>
        <Button variant="contained" onClick={handleSaveQuestion}>Save Question</Button>
      </div>
    </Modal>
  );
};

export default AddQuestionModal;
