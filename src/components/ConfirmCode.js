import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../style/ConfirmCode.module.scss";

export default function ConfirmCode() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value !== "" && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullCode = code.join("");
    console.log("Код подтверждения:", fullCode);
    navigate("/dashboard");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <button onClick={() => navigate("/register")} className={styles.backButton}>
          ←
        </button>
        <h2 className={styles.title}>🔐 Введите код</h2>
        <p className={styles.subtitle}>
          Мы отправили <strong>секретный код</strong> на вашу почту. <br />
          <span className={styles.warning}>Никому не сообщайте его!</span>
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.codeInputContainer}>
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputsRef.current[index] = el)}
                className={styles.codeInput}
              />
            ))}
          </div>
          <button type="submit" className={styles.confirmButton}>
            🔓 Подтвердить
          </button>
        </form>
      </div>
    </div>
  );
}
