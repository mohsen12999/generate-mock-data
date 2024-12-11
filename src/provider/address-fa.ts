import { randomElement, randomNumber } from "../functions/helper";
import { generatePersianFirstName, generatePersianLastName } from "./person-fa";

const cityPrefix = ["استان"];
const streetPrefix = ["خیابان"];
const buildingNamePrefix = ["ساختمان"];
const buildingNumberPrefix = ["پلاک", "قطعه"];
const postcodePrefix = ["کد پستی"];

const cityName = [
  "آذربایجان شرقی",
  "آذربایجان غربی",
  "اردبیل",
  "اصفهان",
  "البرز",
  "ایلام",
  "بوشهر",
  "تهران",
  "خراسان جنوبی",
  "خراسان رضوی",
  "خراسان شمالی",
  "خوزستان",
  "زنجان",
  "سمنان",
  "سیستان و بلوچستان",
  "فارس",
  "قزوین",
  "قم",
  "لرستان",
  "مازندران",
  "مرکزی",
  "هرمزگان",
  "همدان",
  "چهارمحال و بختیاری",
  "کردستان",
  "کرمان",
  "کرمانشاه",
  "کهگیلویه و بویراحمد",
  "گلستان",
  "گیلان",
  "یزد",
];

const generateCity = () =>
  randomElement([
    randomElement(cityName),
    randomElement(cityPrefix) + " " + randomElement(cityName),
  ]);

const generateStreetName = () =>
  randomElement(streetPrefix) + " " + generatePersianLastName();

const generateBuildingName = () => {
  //{{buildingNamePrefix}} {{firstName}}
  const buildingNameMaker1 = () =>
    randomElement(buildingNamePrefix) + " " + generatePersianFirstName();
  // '{{buildingNamePrefix}} {{firstName}} {{ buildingNumberPrefix}} {{buildingNumber}}'
  const buildingNameMaker2 = () =>
    buildingNameMaker1() +
    " " +
    randomElement(buildingNumberPrefix) +
    " " +
    randomNumber(10, 999);

  return randomElement([buildingNameMaker1, buildingNameMaker2])();
};

const generateStreetAddress = () =>
  generateStreetName() + " " + generateBuildingName();

const generatePostcode = () => randomNumber(10000000, 9999999);

export const generatePersianAddress = () => {
  //{{city}} {{streetAddress}}',
  const address1 = () => generateCity() + " " + generateStreetAddress();
  // '{{city}} {{streetAddress}} {{postcodePrefix}} {{postcode}}',
  const address2 = () =>
    address1() + " " + randomElement(postcodePrefix) + " " + generatePostcode();

  return randomElement([address1, address2])();
};

const country = ["ایران"];

const countries = [
  "افغانستان",
  "جزایر آلند",
  "آلبانی",
  "الجزایر",
  "ساموای آمریکا",
  "آندورا",
  "آنگولا",
  "آنگویلا",
  "جنوبگان",
  "آنتیگوا و باربودا",
  "آرژانتین",
  "ارمنستان",
  "آروبا",
  "استرالیا",
  "اتریش",
  "جمهوری آذربایجان",
  "باهاما",
  "بحرین",
  "بنگلادش",
  "باربادوس",
  "بلاروس",
  "بلژیک",
  "بلیز",
  "بنین",
  "برمودا",
  "پادشاهی بوتان",
  "بولیوی",
  "بوسنی و هرزگوین",
  "بوتسوانا",
  "جزیره بووه",
  "برزیل",
  "قلمرو اقیانوس هند بر",
  "برونئی",
  "بلغارستان",
  "بورکینافاسو",
  "بوروندی",
  "کامبوج",
  "کامرون",
  "کانادا",
  "کیپ ورد",
  "جزایر کیمن",
  "جمهوری آفریقای مرکزی",
  "چاد",
  "شیلی",
  "چین",
  "جزیره کریسمس",
  "جزایر کوکوس",
  "کلمبیا",
  "کومور",
  "جمهوری کنگو",
  "جمهوری دموکراتیک کنگ",
  "جزایر کوک",
  "کاستاریکا",
  "ساحل عاج",
  "کرواسی",
  "کوبا",
  "قبرس",
  "جمهوری چک",
  "دانمارک",
  "جیبوتی",
  "دومینیکا",
  "جمهوری دومینیکن",
  "اکوادور",
  "مصر",
  "السالوادور",
  "گینه استوایی",
  "اریتره",
  "استونی",
  "اتیوپی",
  "جزایر فالکند",
  "جزایر فارو",
  "فیجی",
  "فنلاند",
  "فرانسه",
  "گویان فرانسه",
  "پولی‌نزی فرانسه",
  "سرزمین‌های قطب جنوب ",
  "گابون",
  "گامبیا",
  "گرجستان",
  "آلمان",
  "غنا",
  "جبل طارق",
  "یونان",
  "گرینلند",
  "گرنادا",
  "جزیره گوادلوپ",
  "گوآم",
  "گواتمالا",
  "گرنزی",
  "گینه",
  "گینه بیسائو",
  "گویان",
  "هائیتی",
  "جزیره هرد و جزایر مک",
  "واتیکان",
  "هندوراس",
  "هنگ کنگ",
  "مجارستان",
  "ایسلند",
  "هند",
  "اندونزی",
  "ایران",
  "عراق",
  "جمهوری ایرلند",
  "جزیره من",
  "اسرائیل",
  "ایتالیا",
  "جامائیکا",
  "ژاپن",
  "جرسی",
  "اردن",
  "قزاقستان",
  "کنیا",
  "کیریباتی",
  "کره شمالی",
  "کره جنوبی",
  "کویت",
  "قرقیزستان",
  "لائوس",
  "لتونی",
  "لبنان",
  "لسوتو",
  "لیبریا",
  "لیختن‌اشتاین",
  "لیتوانی",
  "لوکزامبورگ",
  "ماکائو",
  "مقدونیه",
  "ماداگاسکار",
  "مالاوی",
  "مالزی",
  "مالدیو",
  "مالی",
  "مالت",
  "جزایر مارشال",
  "مارتینیک",
  "موریتانی",
  "موریس",
  "مایوت",
  "مکزیک",
  "ایالات فدرال میکرونز",
  "مولداوی",
  "موناکو",
  "مغولستان",
  "مونته‌نگرو",
  "مونتسرات",
  "مراکش",
  "موزامبیک",
  "میانمار",
  "نامیبیا",
  "نائورو",
  "نپال",
  "هلند",
  "آنتیل هلند",
  "کالدونیای جدید",
  "نیوزیلند",
  "نیکاراگوئه",
  "نیجر",
  "نیجریه",
  "نیووی",
  "جزیره نورفولک",
  "جزایر ماریانای شمالی",
  "نروژ",
  "عمان",
  "پاکستان",
  "پالائو",
  "فلسطین",
  "پاناما",
  "پاپوآ گینه نو",
  "پاراگوئه",
  "پرو",
  "فیلیپین",
  "جزایر پیت‌کرن",
  "لهستان",
  "پرتغال",
  "پورتوریکو",
  "قطر",
  "رئونیون",
  "رومانی",
  "روسیه",
  "رواندا",
  "سنت بارثلمی",
  "سینت هلینا",
  "سنت کیتس و نویس",
  "سنت لوسیا",
  "سنت مارتین",
  "سنت پیر و ماژلان",
  "سنت وینسنت و گرنادین",
  "ساموآ",
  "سن مارینو",
  "سائوتومه و پرنسیپ",
  "عربستان سعودی",
  "سنگال",
  "صربستان",
  "سیشل",
  "سیرالئون",
  "سنگاپور",
  "اسلواکی",
  "اسلوونی",
  "جزایر سلیمان",
  "سومالی",
  "آفریقای جنوبی",
  "جورجیای جنوبی و جزای",
  "اسپانیا",
  "سری‌لانکا",
  "سودان",
  "سورینام",
  "سوالبارد و یان ماین",
  "سوازیلند",
  "سوئد",
  "سوئیس",
  "سوریه",
  "تاجیکستان",
  "تانزانیا",
  "تایلند",
  "تیمور شرقی",
  "توگو",
  "توکلائو",
  "تونگا",
  "ترینیداد و توباگو",
  "تونس",
  "ترکیه",
  "ترکمنستان",
  "جزایر تورکس و کایکوس",
  "تووالو",
  "اوگاندا",
  "اوکراین",
  "امارات متحده عربی",
  "بریتانیا",
  "ایالات متحده آمریکا",
  "جزایر کوچک حاشیه‌ای ",
  "اروگوئه",
  "ازبکستان",
  "وانواتو",
  "ونزوئلا",
  "ویتنام",
  "جزایر ویرجین انگلستا",
  "جزایر ویرجین ایالات ",
  "والیس و فوتونا",
  "صحرای غربی",
  "یمن",
  "زامبیا",
  "زیمبابوه",
];

export const GeneratePersianCountry = () => randomElement(countries); 