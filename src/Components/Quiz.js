import React, { useState } from 'react';
import '../Css/Quiz.css';
import Header from './Header';
import { Container } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function App() {
	const questions = [
		{
			id: 'danger',
			questionText: 'Have you felt any of the following symptoms in past 1 week?',
			answerOptions: [
				{ answerText: 'Cough and Throat Dryness', isCorrect: true },
				{ answerText: 'Difficulty in Breathing', isCorrect: true },
				{ answerText: 'Fever', isCorrect: true },
				{ answerText: 'Loss of sense of smell and Taste', isCorrect: true },
				{ answerText: 'None of the above', isCorrect: false },
				
			],
		},
		{
			id: 'NA',
			questionText: 'Have you had any past history of chronic disease?',
			answerOptions: [
				{ answerText: 'Yes', isCorrect: true },
				{ answerText: 'No', isCorrect: false },
			],
		},
		{
			id: 'NA',
			questionText: 'Have you travelled anywhere international in the past 14-28 days?',
			answerOptions: [
				{ answerText: 'Yes', isCorrect: true },
				{ answerText: 'No', isCorrect: false },
			]
		},
		{
			id: 'NA',
			questionText: 'In the last two weeks, did you care for or have close contact (within 6 feet of an infected person for at least 15 minutes) with someone with symptoms of COVID-19, tested for COVID-19, or diagnosed with COVID-19?',
			answerOptions: [
				{ answerText: 'Yes', isCorrect: true },
				{ answerText: 'No', isCorrect: false },
				{ answerText: "I don't know", isCorrect: false }
			],
		},
		{
			id: 'danger',
			questionText: 'Do you have any of these possible emergency symptoms?',
			answerOptions: [
				{ answerText: 'Struggling to breathe or fighting for breath even while inactive or when resting', isCorrect: true },
				{ answerText: "Currently feeling as if you're going to collapse every time you stand or sit up", isCorrect: true },
				{ answerText: 'None of the above', isCorrect: false },
			],
		},

		{
			id: 'danger',
			questionText: "Are you experiencing any of the following symptoms (or a combination of these symptoms)?",
			answerOptions: [
				{ answerText: 'Muscle aches', isCorrect: true },
				{ answerText: 'Fatigue', isCorrect: true },
				{ answerText: 'Headache', isCorrect: true },
				{ answerText: 'Sore throat', isCorrect: true },
				{ answerText: 'Runny nose', isCorrect: true },
				{ answerText: 'None of these', isCorrect: false },
				
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [danger, setDangerBox] = useState(false);
	// const [showCard, setShowCard] = useState(true);

	const handleAnswerOptionClick = (isCorrect, id) => {
		if(id==='danger' && isCorrect){
			setDangerBox(true)
			setShowScore(true)
		}
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
	return (
    <div>
      <Header />
      <Container>
			{showScore ? (
        <div style={{marginTop: '30px'}}>
			{danger ? <Alert variant='danger'><Alert.Heading>Self Assessment Result</Alert.Heading>Please call 1075, +91-11-23978046 or email at ncov2019@gmail.com or go directly to your nearest emergency department.</Alert> : <Alert variant='success'><Alert.Heading>Self Assessment Result</Alert.Heading>Your infection risk is low. We recommend that you stay at home to avoid any chance of exposure to the Novel Coronavirus.</Alert>}
			<Button style={{marginLeft: '38%'}} variant="primary" onClick={()=>{setShowScore(false); setCurrentQuestion(0); }}>Re-Take Quiz</Button>
			<Link to='/'><Button style={{marginLeft: '10px'}}>Home</Button></Link>
				</div>
			) : (
		<div className='quiz-app'>
        <>
					<div className='question-section'>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
              <button className='button-quiz' onClick={() => handleAnswerOptionClick(answerOption.isCorrect,questions[currentQuestion].id)}>{answerOption.answerText}</button>
              ))}
					</div>
				</>
			</div>
			)}
      </Container>
      </div>
	);
}