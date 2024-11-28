import coil2Image from "../image/product/coil2.webp";
import amor5Image from "../image/product/5_amor5.jpg";
import engine25Image from "../image/product/engine25.jpg";
import separator2 from "../image/product/separator2.webp";
import natyazhitel from "../image/product/natyazhitel.webp";
import uspokoitel from "../image/product/uspokoitel.webp";
import filtr6 from "../image/product/filtr6.webp";
import amor3 from "../image/product/amor3.webp";
import amor4 from "../image/product/amor4.webp";
import shcheka5 from "../image/product/shcheka5.webp";
import shcheka6 from "../image/product/shcheka6.webp";
import karbyurator4 from "../image/product/karbyurator4.webp";
import karbyurator5 from "../image/product/karbyurator5.webp";

const products = [
    {
        "id": "1",
        "name": "Катушка зажигания Катушка зажигания Катушка зажигания",
        "price": "1027,00 ₽",
        "stock": 23,
        "type": "Скутер",
        "brand": "Suzuki",
        "model": "Address 50 (Suzuki), Address 110 (Suzuki), Address (Suzuki)",
        "category": "Электрика",
        "image": coil2Image,
        "article": "SCOT126723456122",
        "extra": "Доп. комплект: Плотная упаковка",
        "dimensions": "41.2 × 31.7 × 7.1 мм",
        "tags": "1 год"
    },
    {
        "id": "2",
        "name": "Катушка зажигания Yamaha Jog Катушка зажигания Yamaha Jog Катушка зажигания Yamaha Jog",
        "price": "1200,00 ₽",
        "stock": 15,
        "type": "Скутер",
        "brand": "Yamaha",
        "model": "Jog 50 (Yamaha)",
        "category": "Электрика",
        "image": amor5Image,
        "article": "YAMAHA12345",
        "extra": "Запчасть на скутер",
        "dimensions": "42.2 × 32.7 × 8.1 мм",
        "tags": "1 год"
    },
    {
        "id": "3",
        "name": "Патрубок авимравимраоымиырво миылрвомиывлмоыви",
        "price": "2000,00 ₽",
        "stock": 5,
        "type": "Скутер",
        "brand": "Yamaha",
        "model": "Jog 50 (Yamaha)",
        "category": "Двигатель",
        "image": engine25Image,
        "article": "YAMAHA12345",
        "extra": "Запчасть на скутер",
        "dimensions": "42.2 × 32.7 × 8.1 мм",
        "tags": "1 год"
    },
    {
        "id": "4",
        "name": "Сепаратор TWH тюнинг 10x14x13 (Подшипник) на скутер Ямаха Джог, Сузуки Сепия, 50 кубов (Yamaha, Suzuki)",
        "price": "891,00 ₽",
        "stock": 23,
        "type": "Скутер",
        "brand": "Yamaha, Stels",
        "model": "Benelli (Stels), Aerox (Yamaha), BWS 100 (Yamaha), BWS 50 (Yamaha), Axis (Yamaha)",
        "category": "Двигатель",
        "image": separator2,
        "article": "SCOT240000000042",
        "extra": "Сепаратор",
        "dimensions": "10 × 14 × 12.5 mm",
        "tags": "30 дней"
    },
    {
        "id": "5",
        "name": "Натяжитель цепи ГРМ на китайский скутер GY6 150 кубов 157QMJ/152QMI (натяжитель / успокоитель цепи) 125-180 кубов",
        "price": "558,00 ₽",
        "stock": 23,
        "type": "Скутер",
        "brand": "Omaks Motors, IRBIS, Stels",
        "model": "Trigger (Stels)",
        "category": "Двигатель",
        "image": natyazhitel,
        "article": "SCOTT718591236501",
        "extra": "Натяжитель цепи ГРМ",
        "dimensions": "41.2 × 12.4 mm",
        "tags": "1 год"
    },
    {
        "id": "6",
        "name": "Успокоитель цепи распредвала ( ГРМ ) на китайский скутер 50 кубов 139QMB 50сс",
        "price": "727,00 ₽",
        "stock": 23,
        "type": "Скутер",
        "brand": "ABM, Baltmotors, Benelli, CFMOTO, Hyosung, IRBIS, KAYO, Keeway, Lifan, Motoland, Nexus, Racer, Stels",
        "model": "GS (IRBIS), TTR (IRBIS), Benelli (Stels), Trigger (Stels), FORESTER (Motoland)",
        "category": "Двигатель",
        "image": uspokoitel,
        "article": "SCOT240000000001",
        "extra": "успокоитель цепи",
        "dimensions": "18 × 5.9 × 10 mm",
        "tags": "1 год"
    },
    {
        "id": "7",
        "name": "Амортизаторы передние на скутер Хонда Джорно / Такт / Джулио Аф-24, 31, 51, Honda Girno, Tact, Julio 50cc Af",
        "price": "2617,00 ₽",
        "stock": 23,
        "type": "Мотоцикл",
        "brand": "Honda",
        "model": "Dio ",
        "category": "Подвеска",
        "image": amor3,
        "article": "SCOT1267573861",
        "extra": "Плотная упаковка, Запчасть на скутер",
        "dimensions": "260 мм",
        "tags": "1 год"
    },
    {
        "id": "8",
        "name": "Карбюратор PZ22 на мопед альфа 110-125 кубов для 4Т двигателей 152FMI 152FMH",
        "price": "2191,00 ₽",
        "stock": 22,
        "type": "Мотоцикл",
        "brand": "Alpha, Delta",
        "model": "ABM, Baltmotors, Cyclone",
        "category": "Топливная система",
        "image": karbyurator4,
        "article": "SCOT240000000080",
        "extra": "Доп. комплект: Карбюратор на мопед мотоцикл Alpha и Дельта PZ22 с подсосом",
        "dimensions": "17.1 × 28.3 × 21.8 mm",
        "tags": "30 дней"
    }
];

export default products;
