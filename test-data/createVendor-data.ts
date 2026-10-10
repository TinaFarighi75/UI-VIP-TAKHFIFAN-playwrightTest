export type vendorCreateData = {
  id: number | string;
  ownerselectSource: string[];
  ownerName: string;
  ownerFamily: string;
  ownerMobile: string | number;
  businessName: string[];
  businessCategory: string[];
  businessMarketPlace: string[];
  businessMarketPlaceName: string[];
  businessDescription: string[];
  Neighborhood: string[];
  city: string[];
  province: string[];
  Latitude: string[];
  Longitude: string[];
  Region: string;
  address: string;
  tell: string[];
  nationalID: string[];
  foreignNationalCode: string;
  legalnationalID: string;
  EconomicCode: string;
  day: string[];
};

// آبجکت دیتا که گزینه‌های چندتایی را به صورت آرایه نگه می‌دارد
export const vendorCreateData: vendorCreateData = {
  id: 0,
  ownerselectSource: ["معرفی شریک تجاری", "تماس ورودی", "غیره", "آفلاین کشبک"],
  ownerName: "فرانت",
  ownerFamily: "فرانت زاده",
  ownerMobile: "09372692429",
  businessName: [
    "تریاکیانو",
    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد",
  ],
  businessCategory: [
    "رستوران و کافی شاپ",
    "زیبایی و آرایشی",
    "سلامتی و پزشکی",
    "تفریحی و ورزشی",
    "آموزش",
    "هنر و تئاتر",
    "فروشگاه زنجیره ای",
    "مد و زیورآلات",
    "عطاری",
    "تور و سفر",
    "خدمات",
  ],
  businessMarketPlace: ["ندارد", "دارد"],
  businessMarketPlaceName: ["باران", "پارسیان"],
  businessDescription: [
    "تست برای شخص حقیقی",
    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
  ],
  Neighborhood: ["جنت آباد", "چهارباغ بالا"],
  city: ["تهران", "اصفهان"],
  province: ["تهران", "اصفهان"],
  Latitude: ["35.71155653300584", "39.11940660636222"],
  Longitude: ["51.410350799560554", "32.95898437500001"],
  Region: "منطقه 5",
  address: "جنت آباد مرکزی بیست متری گلستان غربی",
  tell: ["02188881111", "44554"],
  nationalID: ["0012918008", "0012345678"],
  foreignNationalCode: "987654321012",
  legalnationalID: "10101010100",
  EconomicCode: "411111111111",
  day: [
    "همه روزها",
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهارشنبه",
    "پنج شنبه",
    "جمعه",
  ],
};
