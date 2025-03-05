import styles from "./Feedback.module.css";

export default function Feedback({ feedback, totalFeedback, roundFeedback }) {
  return (
    <div className={styles.some}>
      <p>Good:{feedback.good}</p>
      <p>Neutral:{feedback.neutral}</p>
      <p>Bad:{feedback.bad}</p>
      <p>Total:{totalFeedback}</p>
      <p>Positive:{roundFeedback}%</p>
    </div>
  );
}
