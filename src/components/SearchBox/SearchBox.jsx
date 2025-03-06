import styles from "./SearchBox.module.css";

export default function SearchBox({ value, onValue }) {
  return (
      <input className={styles.box} type="text" value={value} onChange={(evt) => onValue(evt.target.value)} />
  );
}
