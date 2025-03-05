import { useState, useEffect } from "react";
import "../App/App.css";

import Description from "../Description/Description.jsx";
import Options from "../Options/Options.jsx";
import Feedback from "../Feedback/Feedback.jsx";
import Notification from "../Notification/Notification.jsx";

export default function App() {
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem("feedback");
    return savedFeedback ? JSON.parse(savedFeedback) : { good: 0, neutral: 0, bad: 0 };
  });

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const roundFeedback = Math.round((feedback.good / totalFeedback) * 100);

  const updateFeedback = (feedbackType) => {
    if (feedbackType == "reset") {
      setFeedback({ good: 0, neutral: 0, bad: 0 });
      localStorage.removeItem("feedback");
      return;
    }
    setFeedback((values) => ({
      ...values,
      [feedbackType]: values[feedbackType] + 1,
    }));
  };

  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} />
      {totalFeedback > 0 ? <Feedback feedback={feedback} totalFeedback={totalFeedback} roundFeedback={roundFeedback} /> : <Notification />}
    </>
  );
}
