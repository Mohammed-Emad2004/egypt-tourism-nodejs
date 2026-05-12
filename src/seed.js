const mongoose = require('mongoose');
require('./db');
const Destination = require('./models/destination');

const destinationsData = [
    { id: 1, name: "أهرامات الجيزة", city: "الجيزة", category: "تاريخي", image: "images/pyramids.jpg", description: "تعد أهرامات الجيزة من أقدم وأعظم العجائب التي بناها الإنسان في التاريخ. تضم الهرم الأكبر خوفو وخفرع ومنقرع بالإضافة إلى تمثال أبو الهول الأيقوني.", bestTime: "أكتوبر - أبريل" },
    { id: 2, name: "قلعة قايتباي", city: "الإسكندرية", category: "تاريخي", image: "images/Qaitbay_Citadel.jpg", description: "حصن دفاعي تاريخي يقع في مدينة الإسكندرية على ساحل البحر المتوسط، بُني في موقع فنار الإسكندرية القديم لحماية المدينة من الغزوات.", bestTime: "الربيع والصيف" },
    { id: 3, name: "معبد أبو سمبل", city: "أسوان", category: "تاريخي", image: "images/Abu_Simbel_Temple.jpg", description: "من أروع المعابد المصرية القديمة المنحوتة في الصخر، ويشتهر بظاهرة تعامد الشمس المذهلة على وجه تمثال الملك رمسيس الثاني مرتين كل عام.", bestTime: "فصل الشتاء" },
    { id: 4, name: "محمية رأس محمد", city: "شرم الشيخ", category: "طبيعة", image: "images/Ras_Mohammed_Nature_Reserve.jpg", description: "أول محمية طبيعية في مصر، وتعتبر من أجمل مناطق الغوص في العالم بفضل الشعاب المرجانية النادرة وتنوع الحياة البحرية الساحر.", bestTime: "طوال العام" },
    { id: 5, name: "معابد الكرنك", city: "الأقصر", category: "تاريخي", image: "images/Karnak_Temple.jpg", description: "أكبر مجمع ديني في العالم القديم، يضم مجموعة مذهلة من المعابد والمقاصير والأعمدة الشاهقة التي بُنيت على مر العصور الفرعونية.", bestTime: "فصل الشتاء" },
    { id: 6, name: "وادي الملوك", city: "الأقصر", category: "تاريخي", image: "images/valley_of_the_kings_2.jpg", description: "منطقة جبلية تضم مقابر الفراعنة والنبلاء من عصر الدولة الحديثة، وأشهرها على الإطلاق مقبرة الملك الشاب توت عنخ آمون.", bestTime: "فصل الشتاء" },
    { id: 7, name: "المتحف المصري بالتحرير", city: "القاهرة", category: "تاريخي", image: "images/Egyptian_Museum_in_Tahrir.jpg", description: "يحتوي على واحدة من أكبر المجموعات الأثرية في العالم، ليأخذك في رحلة عبر تاريخ الحضارة المصرية القديمة.", bestTime: "طوال العام" },
    { id: 8, name: "برج القاهرة", city: "القاهرة", category: "حديث", image: "images/Cairo_Tower.jpg", description: "برج بتصميم يحاكي زهرة اللوتس يبلغ ارتفاعه 187 متراً، يوفر إطلالة بانورامية رائعة لا تُنسى على مدينة القاهرة ونهر النيل.", bestTime: "المساء طوال العام" },
    { id: 9, name: "الجامع الأزهر", city: "القاهرة", category: "ديني", image: "images/Al-Azhar_Mosque.jpg", description: "من أهم المساجد في مصر وأقدم جامعة إسلامية في العالم، يتميز بعمارته الإسلامية الفريدة وأروقته العريقة.", bestTime: "طوال العام" },
    { id: 10, name: "دير سانت كاترين", city: "جنوب سيناء", category: "ديني", image: "images/Saint_Catherine's_Monastery.jpg", description: "من أقدم الأديرة العاملة في العالم، يقع عند سفح جبل سيناء ويضم مكتبة أثرية نادرة ومقتنيات دينية وتاريخية لا تقدر بثمن.", bestTime: "الربيع والخريف" },
    { id: 11, name: "مكتبة الإسكندرية", city: "الإسكندرية", category: "حديث", image: "images/Library_of_Alexandria.jpg", description: "صرح ثقافي ضخم وإعادة إحياء لمكتبة الإسكندرية القديمة، يتميز بتصميم معماري عصري مذهل ويضم ملايين الكتب ومتاحف وقبة سماوية.", bestTime: "طوال العام" },
    { id: 12, name: "معبد فيلة", city: "أسوان", category: "تاريخي", image: "images/Philae_Temple.jpg", description: "معبد مخصص للإلهة إيزيس يقع على جزيرة في نهر النيل، يمتاز بجماله المعماري وتم إنقاذه من الغرق ونقله لجزيرة أجيليكا.", bestTime: "فصل الشتاء" },
    { id: 13, name: "خان الخليلي", city: "القاهرة", category: "تاريخي", image: "images/Al-Muizz_Street.jpg", description: "أحد أقدم الأسواق التراثية في الشرق الأوسط، يشتهر ببيع الحرف اليدوية، الهدايا التذكارية، والمقاهي العريقة مثل مقهى الفيشاوي.", bestTime: "المساء طوال العام" },
    { id: 14, name: "واحة سيوة", city: "مطروح", category: "طبيعة", image: "images/Siwa_Oasis.jpg", description: "واحة خضراء في قلب الصحراء الغربية، تشتهر بعيون المياه الكبريتية، بحيرات الملح الصافية، وآثار قلعة شالي.", bestTime: "الشتاء والربيع" },
    { id: 15, name: "الصحراء البيضاء", city: "الوادي الجديد", category: "طبيعة", image: "images/White_Desert.jpg", description: "محمية طبيعية خلابة تتميز بتكويناتها الصخرية الطباشيرية البيضاء التي تشكلت بفعل الرياح لتبدو كمنحوتات سريالية.", bestTime: "فصل الشتاء" },
    { id: 16, name: "الكنيسة المعلقة", city: "القاهرة", category: "ديني", image: "images/The_Hanging_Church.jpg", description: "من أقدم الكنائس في مصر، وتقع في مجمع الأديان. سُميت بهذا الاسم لأنها بُنيت على برجين من أبراج حصن بابليون الروماني القديم.", bestTime: "طوال العام" },
    { id: 17, name: "قصر المنتزه", city: "الإسكندرية", category: "حديث", image: "images/Montazah_Gardens_and_Palace.jpg", description: "قصر ملكي سابق يتميز بحدائقه الشاسعة وتصميمه المعماري الفريد الذي يجمع بين الطرازين الإسلامي والفلورنسي، مع إطلالة ساحرة على البحر.", bestTime: "الربيع والصيف" },
    { id: 18, name: "معبد الأقصر", city: "الأقصر", category: "تاريخي", image: "images/Luxor_Temple.jpg", description: "معبد ضخم يقع في وسط مدينة الأقصر، وكان قديماً متصلاً بمعابد الكرنك عبر طريق الكباش العظيم الذي تم ترميمه مؤخراً.", bestTime: "فصل الشتاء" },
    { id: 19, name: "الوادي الملون", city: "نويبع", category: "طبيعة", image: "images/The_Colored_Valley.jpg", description: "وادي ضيق وساحر في سيناء يتميز بجدرانه الصخرية ذات الألوان المتعددة التي تشكلت بفعل الأمطار والسيول عبر ملايين السنين.", bestTime: "الربيع والخريف" },
    { id: 20, name: "المتحف المصري الكبير", city: "الجيزة", category: "حديث", image: "images/Grand_Egyptian_Museum.jpg", description: "أكبر متحف أثري في العالم مخصص لحضارة واحدة، يقع بالقرب من الأهرامات ويضم المجموعة الكاملة لكنوز الملك توت عنخ آمون.", bestTime: "طوال العام" }
];

const importData = async () => {
    try {
        await Destination.deleteMany();
        console.log('data cleared');

        await Destination.insertMany(destinationsData);
        console.log('data imported successfully');

        mongoose.connection.close();
        process.exit();
    } catch (error) {
        console.error('error: ', error);
        process.exit(1);
    }
};

importData();