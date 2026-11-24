// محتوای درس‌های ۱ تا ۷ کتاب Prospect 2 (پایه هشتم)
// words: [English, فارسی, emoji]
const LESSONS = [
{ id:1, title:"My Nationality", fa:"ملیت من", emoji:"🌍", color:"#ff7043",
  words:[
    ["Iran","ایران","🇮🇷"],["Iranian","ایرانی","🇮🇷"],
    ["France","فرانسه","🇫🇷"],["French","فرانسوی","🥖"],
    ["England","انگلستان","🇬🇧"],["British","بریتانیایی","☕"],
    ["China","چین","🇨🇳"],["Chinese","چینی","🐼"],
    ["Spain","اسپانیا","🇪🇸"],["Spanish","اسپانیایی","💃"],
    ["Brazil","برزیل","🇧🇷"],["Brazilian","برزیلی","⚽"],
    ["chair","صندلی","🪑"],["shoes","کفش","👟"],["fruit","میوه","🍎"],
    ["cousin","پسرعمو / دخترخاله","🧒"],["teacher","معلم","👩‍🏫"],
    ["country","کشور","🗺️"],["beautiful","زیبا","🌸"],["welcome","خوش‌آمدی","👋"]
  ],
  sents:[
    ["Are you from Iran?","Yes, I am."],
    ["Are you Iranian?","Yes, I am."],
    ["Is she from China?","No, she isn't."],
    ["Are they from Spain?","Yes, they are."],
    ["Where are you from?","I'm from Iran."],
    ["Where is Mark from?","He's from France."],
    ["Where is Mary from?","She's from England."],
    ["Are you from France?","No, I'm not."]
  ],
  dialog:[
    ["Shayan","Mr. Chaychi, this is my cousin Sam. He speaks French, English, and a little Persian."],
    ["Teacher","Oh, nice to meet you, Sam."],
    ["Sam","Nice to meet you, too."],
    ["Teacher","Are you from Iran?"],
    ["Sam","Yes, I'm originally Iranian, but I live in France."],
    ["Teacher","Welcome to our class. How do you like it in Iran?"],
    ["Sam","Iran is great! I love it. It's a beautiful country."]
  ]},
{ id:2, title:"My Week", fa:"هفته من", emoji:"📅", color:"#ffa000",
  words:[
    ["Saturday","شنبه","1️⃣"],["Sunday","یکشنبه","2️⃣"],["Monday","دوشنبه","3️⃣"],
    ["Tuesday","سه‌شنبه","4️⃣"],["Wednesday","چهارشنبه","5️⃣"],["Thursday","پنجشنبه","🎈"],["Friday","جمعه","🌴"],
    ["morning","صبح","🌅"],["afternoon","بعدازظهر","☀️"],["evening","عصر / شب","🌆"],
    ["weekdays","روزهای هفته","📆"],["weekend","آخر هفته","🎉"],
    ["go to school","به مدرسه رفتن","🏫"],["play sports","ورزش کردن","🏃"],
    ["study","درس خواندن","📚"],["watch TV","تماشای تلویزیون","📺"],
    ["visit relatives","دیدن فامیل","👨‍👩‍👧"],["go shopping","خرید رفتن","🛍️"],
    ["library","کتابخانه","📖"],["relax","استراحت کردن","😌"]
  ],
  sents:[
    ["What do you do in the mornings?","I go to school."],
    ["What do you do in the afternoons?","We play sports."],
    ["What do you do in the evenings?","I study my lessons."],
    ["What do you do on Friday mornings?","We watch TV."],
    ["When do you study English?","On Monday mornings."],
    ["What days do you go shopping?","Every Wednesday afternoon."],
    ["When do you go to school?","Every weekday."],
    ["What days do you play sports?","On Saturdays and Tuesdays."]
  ],
  dialog:[
    ["Teacher","What do you do in the afternoons, Reihaneh?"],
    ["Student","Well, I go to the gym on Sundays and Tuesdays."],
    ["Teacher","How about Friday mornings?"],
    ["Student","I stay at home and relax. Why?"],
    ["Teacher","You know, Shiva is not very good at English. Can you help her?"],
    ["Student","Oh, sure."],
    ["Teacher","That sounds great! When can you start?"],
    ["Student","This Wednesday afternoon."],
    ["Teacher","That's fine. Thank you. I'll let her know."]
  ]},
{ id:3, title:"My Abilities", fa:"توانایی‌های من", emoji:"💪", color:"#43a047",
  words:[
    ["draw","نقاشی کردن","🎨"],["cook","آشپزی کردن","🍳"],
    ["take photos","عکس گرفتن","📷"],["search the Web","جست‌وجو در وب","🔍"],
    ["swim","شنا کردن","🏊"],["ride a bicycle","دوچرخه‌سواری","🚲"],
    ["do a puzzle","پازل حل کردن","🧩"],["play football","فوتبال بازی کردن","⚽"],
    ["play basketball","بسکتبال بازی کردن","🏀"],["play tennis","تنیس بازی کردن","🎾"],
    ["make a cake","کیک درست کردن","🎂"],["tell stories","قصه گفتن","📖"],
    ["computer","رایانه","💻"],["drawing","نقاشی","🖼️"],
    ["good at","ماهر در","👍"],["football","فوتبال","🏈"],["afternoon","بعدازظهر","☀️"],
    ["swimming","شنا","🏊‍♂️"],["question","سؤال","❓"],["student","دانش‌آموز","🧑‍🎓"]
  ],
  sents:[
    ["Are you good at drawing?","Yes, I am."],
    ["Is she good at cooking?","No, she isn't."],
    ["Can you make a cake?","Yes, I can."],
    ["Can he do a puzzle?","No, he can't."],
    ["Can you ride a bicycle?","Yes, I can."],
    ["Who can play tennis?","Ali can."],
    ["Can they play basketball?","Yes, they can."],
    ["Are they good at swimming?","Yes, they are."]
  ],
  dialog:[
    ["Elham","Wow! Your drawing is very good."],
    ["Sara","Thanks. Can you draw?"],
    ["Elham","No, I'm not good at drawing. But I can take good photos."],
    ["Sara","Really? Can I see your photos?"],
    ["Elham","Why not? Come to my house this afternoon."],
    ["Sara","Oh, I can't make it today. How about Thursday afternoon?"],
    ["Elham","That's fine. You can bring your drawing book, too."],
    ["Sara","Sure."]
  ]},
{ id:4, title:"My Health", fa:"سلامتی من", emoji:"🩺", color:"#e53935",
  words:[
    ["headache","سردرد","🤕"],["sore throat","گلودرد","😷"],
    ["toothache","دندان‌درد","🦷"],["earache","گوش‌درد","👂"],
    ["running nose","آبریزش بینی","🤧"],["backache","کمردرد","🧍"],
    ["sore eyes","چشم‌درد","👀"],["stomachache","دل‌درد","🤢"],
    ["the flu","آنفولانزا","🤒"],["a cold","سرماخوردگی","🥶"],
    ["doctor","دکتر","👨‍⚕️"],["dentist","دندانپزشک","🦷"],
    ["rest","استراحت","🛌"],["go home","به خانه رفتن","🏠"],
    ["worry","نگران بودن","😟"],["problem","مشکل","⚠️"],
    ["parents","والدین","👨‍👩‍👦"],["office","دفتر","🏢"],
    ["ache","درد","😣"],["health","سلامتی","❤️"]
  ],
  sents:[
    ["Are you OK?","No, I have a headache."],
    ["Is she all right?","No, she has a sore throat."],
    ["What's wrong?","I have a toothache."],
    ["What's the matter?","He has a running nose."],
    ["What's the problem?","I have the flu."],
    ["I have a headache.","Why don't you get some rest?"],
    ["I have a sore throat.","You should see a doctor."],
    ["I have a toothache.","Go to the dentist."]
  ],
  dialog:[
    ["Teacher","Are you OK?"],
    ["Student","No, I'm not. I have a headache."],
    ["Teacher","Oh, you have sore eyes, too. You should go home and rest."],
    ["Student","Yes, but we have one more class."],
    ["Teacher","Don't worry. I'll talk to your teacher."],
    ["Student","Thanks for your help."],
    ["Teacher","Let's go to the office and call your parents first. Class, be quiet! I'll be back in a minute."]
  ]},
{ id:5, title:"My City", fa:"شهر من", emoji:"🏙️", color:"#1e88e5",
  words:[
    ["shrine","زیارتگاه","🕌"],["museum","موزه","🏛️"],["bridge","پل","🌉"],
    ["metro","مترو","🚇"],["restaurant","رستوران","🍽️"],["airport","فرودگاه","✈️"],
    ["zoo","باغ‌وحش","🦁"],["stadium","ورزشگاه","🏟️"],["library","کتابخانه","📚"],
    ["mosque","مسجد","🕌"],["palace","کاخ","🏰"],
    ["north","شمال","⬆️"],["south","جنوب","⬇️"],["east","شرق","➡️"],["west","غرب","⬅️"],
    ["center","مرکز","🎯"],["big","بزرگ","🐘"],["clean","تمیز","✨"],
    ["old","قدیمی","🏺"],["famous","مشهور","⭐"]
  ],
  sents:[
    ["Where is Isfahan?","It's in the center of Iran."],
    ["Where is Maku?","It's in the north-west."],
    ["Where is Karaj?","It's near the capital."],
    ["What's Isfahan like?","It's a big city."],
    ["What is it famous for?","It's very famous for its old mosques."],
    ["Is there a metro system?","Yes, there is."],
    ["Are there any museums?","Yes, some great ones."],
    ["Are there any libraries?","No, there aren't."]
  ],
  dialog:[
    ["Phanindra","Morteza, tell me about Isfahan. Where is it?"],
    ["Morteza","Well, Isfahan's an old city in the center of Iran."],
    ["Phanindra","What's it like?"],
    ["Morteza","It's a big and clean city."],
    ["Phanindra","Any famous buildings?"],
    ["Morteza","Yes, many. Actually, Isfahan is very famous for its mosques and palaces."],
    ["Phanindra","Are there any museums?"],
    ["Morteza","Yes, some great ones."],
    ["Phanindra","I should see the city soon."],
    ["Morteza","Sure, and we can have special food downtown."]
  ]},
{ id:6, title:"My Village", fa:"روستای من", emoji:"🌻", color:"#8e24aa",
  words:[
    ["village","روستا","🏘️"],["field","مزرعه","🌾"],["trees","درختان","🌳"],
    ["flowers","گل‌ها","🌷"],["mountain","کوه","⛰️"],["river","رودخانه","🏞️"],
    ["plow","گاوآهن","🪓"],["cattle","گاو و گوسفند","🐄"],["tractor","تراکتور","🚜"],
    ["windy","بادی","💨"],["sunny","آفتابی","🌞"],["rainy","بارانی","🌧️"],["snowy","برفی","❄️"],
    ["hot","گرم (داغ)","🔥"],["cold","سرد","🥶"],["warm","ملایم / گرم","🌤️"],
    ["wet","مرطوب","💧"],["dry","خشک","🏜️"],
    ["summer","تابستان","🏖️"],["winter","زمستان","⛄"]
  ],
  sents:[
    ["What is Ghez-ghal'eh like?","It's a mountain village."],
    ["What is it famous for?","It's famous for its sunflower fields."],
    ["Is it near the city?","Yes, it is."],
    ["What's the people's job?","They work on farms and raise animals."],
    ["Are there any fields?","Yes, there are."],
    ["Is there a river?","No, there isn't."],
    ["What's the weather like in summer?","It's sunny."],
    ["Is it cold in winter?","Yes, it is."]
  ],
  dialog:[
    ["Sam","Where are you from, Hamid?"],
    ["Hamid","Ghez-ghal'eh."],
    ["Sam","Where is it?"],
    ["Hamid","It's a village in West Azarbaijan, near the city of Khoy."],
    ["Sam","What's it like?"],
    ["Hamid","It's a mountain village with many trees and flowers. It's famous for its sunflower fields."],
    ["Sam","What's the people's job?"],
    ["Hamid","They work on farms and raise animals."],
    ["Sam","What about the weather?"],
    ["Hamid","There's a lot of wind in summer, fall and winter."],
    ["Sam","It sounds to be a very interesting place."]
  ]},
{ id:7, title:"My Hobbies", fa:"سرگرمی‌های من", emoji:"🎮", color:"#00acc1",
  words:[
    ["hobby","سرگرمی","⭐"],["free time","وقت آزاد","🕐"],
    ["reading","مطالعه کردن","📖"],["walking in the park","قدم زدن در پارک","🚶"],
    ["listening to the radio","گوش دادن به رادیو","📻"],["watching movies","تماشای فیلم","🎬"],
    ["shopping","خرید کردن","🛒"],["playing tennis","تنیس بازی کردن","🎾"],
    ["playing computer games","بازی رایانه‌ای","🎮"],["horse riding","اسب‌سواری","🐎"],
    ["searching the Web","جست‌وجو در وب","🔍"],["browsing","گشتن در اینترنت","🌐"],
    ["magazines","مجله‌ها","📰"],["poems","شعرها","📜"],
    ["stories","داستان‌ها","📚"],["movies","فیلم‌ها","🍿"],
    ["gym","باشگاه","🏋️"],["enjoy","لذت بردن","😍"],
    ["usually","معمولاً","🔁"],["sometimes","گاهی اوقات","🌗"]
  ],
  sents:[
    ["Do you have any hobbies?","Yes, listening to stories on the radio."],
    ["What do you do as a hobby?","I watch movies as a hobby."],
    ["Do you like reading?","Yes, very much."],
    ["What's your hobby?","I enjoy searching the Web."],
    ["What do you do in your free time?","I play tennis."],
    ["What do you do in your free time?","I usually go shopping."],
    ["What do you like to do in your free time?","I walk in the park."],
    ["What do you like to do in your free time?","I like playing computer games."]
  ],
  dialog:[
    ["Teacher","Do you have any hobbies, Zahra?"],
    ["Zahra","Yes, I do. I watch movies as a hobby."],
    ["Teacher","Interesting! How about you, Samira?"],
    ["Samira","Well, I love reading."],
    ["Zahra","Really? What sort of things do you read?"],
    ["Samira","Books, magazines, sports news on the Net, and sometimes poems."],
    ["Zahra","And how about you, Mrs. Emami?"],
    ["Teacher","Actually, I don't have any hobbies. But I usually go to the gym in my free time."]
  ]}
];
