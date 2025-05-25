const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: "http://localhost:3002", 
}));
app.use(express.json());

const dialogContext = new Map();

app.post("/api/chat", (req, res) => {
  const userId = req.ip || req.headers["x-forwarded-for"] || "unknown_user";
  const userMessage = (req.body.message || "").toLowerCase().trim();

  if (!dialogContext.has(userId)) {
    dialogContext.set(userId, {
      lastQuestions: [],
      context: {},
      lastActivity: Date.now(),
    });
  }

  const userContext = dialogContext.get(userId);
  const reply = getBotReply(userMessage, userContext);

  userContext.lastActivity = Date.now();
  dialogContext.set(userId, userContext);

  res.json({ reply });
});

function getBotReply(message, context) {
  const greetings = ["привет", "здравствуй", "добрый день", "добрый вечер"];
  const helpQuestions = {
    "как оформить заказ": "Чтобы оформить заказ, выберите товар, добавьте его в корзину и перейдите к оформлению заказа.",
    "способы оплаты": "Мы принимаем оплату наличными, картой и онлайн через популярные платежные системы.",
    "сколько длится доставка": "Доставка обычно занимает от 1 до 5 рабочих дней, в зависимости от региона.",
    "можно ли вернуть товар": "Вы можете вернуть товар в течение 14 дней при условии сохранения товарного вида и упаковки.",
    "график работы": "Мы работаем с 9:00 до 18:00 по будням и с 10:00 до 15:00 в субботу.",
    "где находится магазин": "Наш магазин находится по адресу: г. Москва, ул. Примерная, д.1.",
    "как подобрать патрубки": "Чтобы подобрать патрубки, укажите модель вашего скутера и год выпуска, мы поможем подобрать подходящие детали.",
    "как с вами связаться": "Вы можете связаться с нами по телефону +7 (495) 123-45-67 или по электронной почте support@example.com."
  };

  if (greetings.some(g => message.includes(g))) {
    return "Здравствуйте! Чем могу помочь?";
  }

  for (const [key, val] of Object.entries(helpQuestions)) {
    if (message.includes(key)) return val;
  }

  return "Извините, я не совсем понял ваш вопрос. Попробуйте сформулировать иначе.";
}

setInterval(() => {
  const now = Date.now();
  for (const [userId, ctx] of dialogContext) {
    if (now - ctx.lastActivity > 1000 * 60 * 60) { 
      dialogContext.delete(userId);
    }
  }
}, 1000 * 60 * 10); 

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Chatbot server listening on port ${PORT}`);
});
