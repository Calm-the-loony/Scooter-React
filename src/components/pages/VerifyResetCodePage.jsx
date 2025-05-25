import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../service/api/auth/AuthApiService";
import styles from "../../style/ConfirmCode.module.scss";

const VerifyResetCodePage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value !== "" && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const fullCode = code.join("");
    const email = localStorage.getItem("email-for-reset");
    const newPassword = localStorage.getItem("new-password");

    if (!email || !newPassword) {
      setErrorMessage("Сессия истекла. Пожалуйста, начните процесс заново.");
      return;
    }

    setIsLoading(true);

    AuthService.resetPassword(email, fullCode, newPassword)
      .then(() => {
        localStorage.removeItem("email-for-reset");
        localStorage.removeItem("new-password");
        navigate("/login", {
          state: { passwordResetSuccess: true }
        });
      })
      .catch((error) => {
        setErrorMessage(
          error.message || 
          "Не удалось подтвердить сброс пароля. Проверьте код и попробуйте снова."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <button
          onClick={() => navigate("/forgot-password")}
          className={styles.backButton}
        >
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
          
          {errorMessage && (
            <div className={styles.errorMessage}>
              {errorMessage}
            </div>
          )}
          
          <button 
            type="submit" 
            className={styles.confirmButton}
            disabled={isLoading}
          >
            {isLoading ? "Подтверждение..." : "🔓 Подтвердить"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyResetCodePage;