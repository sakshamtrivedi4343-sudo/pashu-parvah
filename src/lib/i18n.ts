import type { Lang } from "./pashu-types";

export const LANGS: { id: Lang; label: string; short: string }[] = [
  { id: "en", label: "English", short: "EN" },
  { id: "hi", label: "हिंदी", short: "हिं" },
  { id: "mr", label: "मराठी", short: "मरा" },
];

const dict = {
  // nav
  home: { en: "Home", hi: "होम", mr: "होम" },
  report: { en: "Report", hi: "रिपोर्ट", mr: "अहवाल" },
  records: { en: "Records", hi: "रिकॉर्ड", mr: "नोंदी" },
  alerts: { en: "Alerts", hi: "चेतावनी", mr: "सूचना" },
  profile: { en: "Profile", hi: "प्रोफ़ाइल", mr: "प्रोफाइल" },

  // header
  tagline: { en: "Livestock Health AI", hi: "पशु स्वास्थ्य सहायक", mr: "पशु आरोग्य सहाय्यक" },
  worksOffline: { en: "Works Offline", hi: "ऑफ़लाइन चालू", mr: "ऑफलाइन चालू" },
  chooseLanguage: { en: "Choose your language", hi: "अपनी भाषा चुनें", mr: "तुमची भाषा निवडा" },
  iAm: { en: "I am a", hi: "मैं हूँ", mr: "मी आहे" },
  farmer: { en: "Farmer", hi: "किसान", mr: "शेतकरी" },
  vet: { en: "Veterinarian", hi: "पशु डॉक्टर", mr: "पशुवैद्य" },
  gov: { en: "Government", hi: "सरकार", mr: "शासन" },

  // status
  healthy: { en: "Healthy", hi: "स्वस्थ", mr: "निरोगी" },
  monitor: { en: "Watch", hi: "निगरानी", mr: "निरीक्षण" },
  risk: { en: "At Risk", hi: "खतरे में", mr: "धोक्यात" },

  // farmer home
  myAnimals: { en: "My Animals", hi: "मेरे पशु", mr: "माझी जनावरे" },
  addAnimal: { en: "Add Animal", hi: "पशु जोड़ें", mr: "जनावर जोडा" },
  saveAnimal: { en: "Save Animal", hi: "पशु सुरक्षित करें", mr: "जनावर जतन करा" },
  animalName: { en: "Animal name", hi: "पशु का नाम", mr: "जनावराचे नाव" },
  species: { en: "Type of animal", hi: "पशु का प्रकार", mr: "जनावराचा प्रकार" },
  age: { en: "Age (e.g. 3 yrs)", hi: "उम्र (जैसे 3 साल)", mr: "वय (उदा. 3 वर्षे)" },
  tagId: { en: "Tag number", hi: "टैग नंबर", mr: "टॅग क्रमांक" },
  reportSymptoms: { en: "Report Symptoms", hi: "बीमारी बताएं", mr: "आजार सांगा" },
  vaccination: { en: "Vaccination Reminders", hi: "टीके की याद", mr: "लसीकरण स्मरण" },
  allVaccinesDone: {
    en: "All vaccinations are up to date.",
    hi: "सभी टीके पूरे हैं।",
    mr: "सर्व लसीकरण पूर्ण आहे.",
  },
  markDone: { en: "Done", hi: "हो गया", mr: "झाले" },
  due: { en: "due", hi: "तारीख", mr: "तारीख" },
  animalsCount: { en: "Animals", hi: "पशु", mr: "जनावरे" },
  atRiskCount: { en: "At Risk", hi: "खतरे में", mr: "धोक्यात" },
  dueVaccines: { en: "Vaccines Due", hi: "टीके बाकी", mr: "लस बाकी" },
  riskBanner: {
    en: "animal(s) marked High Risk",
    hi: "पशु ज़्यादा खतरे में हैं",
    mr: "जनावरे जास्त धोक्यात आहेत",
  },
  vetNotified: {
    en: "The doctor has been informed — expect a call within 24 hours.",
    hi: "डॉक्टर को सूचना भेज दी गई है — 24 घंटे में फोन आएगा।",
    mr: "डॉक्टरांना कळवले आहे — 24 तासांत फोन येईल.",
  },
  lastCheckup: { en: "Last checkup", hi: "पिछली जाँच", mr: "मागील तपासणी" },
  tapToOpen: { en: "Tap a card to see details", hi: "जानकारी देखने के लिए दबाएं", mr: "माहितीसाठी दाबा" },

  // report flow
  step1: { en: "Step 1 · Choose the animal", hi: "चरण 1 · पशु चुनें", mr: "पायरी 1 · जनावर निवडा" },
  step2: { en: "Step 2 · Tick what you see", hi: "चरण 2 · जो दिख रहा है चुनें", mr: "पायरी 2 · जे दिसते ते निवडा" },
  step3: { en: "Step 3 · Add a photo (optional)", hi: "चरण 3 · फोटो जोड़ें (ज़रूरी नहीं)", mr: "पायरी 3 · फोटो जोडा (ऐच्छिक)" },
  takePhoto: { en: "Take or choose a photo", hi: "फोटो खींचें या चुनें", mr: "फोटो काढा किंवा निवडा" },
  analyse: { en: "Check with AI", hi: "एआई से जाँचें", mr: "एआयने तपासा" },
  pickAtLeastOne: {
    en: "Tick at least one symptom to continue.",
    hi: "आगे बढ़ने के लिए कम से कम एक लक्षण चुनें।",
    mr: "पुढे जाण्यासाठी किमान एक लक्षण निवडा.",
  },
  highRisk: { en: "High Risk", hi: "ज़्यादा खतरा", mr: "जास्त धोका" },
  lowRisk: { en: "Low Risk", hi: "कम खतरा", mr: "कमी धोका" },
  confidence: { en: "sure", hi: "पक्का", mr: "खात्री" },
  highAdvice: {
    en: "This may spread to other animals. Keep it separate — the doctor has been informed.",
    hi: "यह दूसरे पशुओं में फैल सकता है। इसे अलग रखें — डॉक्टर को सूचना भेज दी गई है।",
    mr: "हे इतर जनावरांना पसरू शकते. वेगळे ठेवा — डॉक्टरांना कळवले आहे.",
  },
  lowAdvice: {
    en: "No urgent danger. Keep watching and report again if it gets worse.",
    hi: "अभी खतरा नहीं है। ध्यान रखें और बिगड़ने पर फिर बताएं।",
    mr: "सध्या धोका नाही. लक्ष ठेवा आणि वाढल्यास पुन्हा कळवा.",
  },
  sentToVet: {
    en: "Sent to the doctor's list.",
    hi: "डॉक्टर की सूची में भेज दिया गया।",
    mr: "डॉक्टरांच्या यादीत पाठवले.",
  },

  // records
  selectAnimal: { en: "Choose an animal", hi: "पशु चुनें", mr: "जनावर निवडा" },
  healthRecord: { en: "Health Record", hi: "स्वास्थ्य रिकॉर्ड", mr: "आरोग्य नोंद" },
  noHistory: { en: "No history yet.", hi: "अभी कोई जानकारी नहीं।", mr: "अद्याप नोंद नाही." },

  // vet
  casesToday: { en: "Cases Today", hi: "आज के केस", mr: "आजचे रुग्ण" },
  highRiskPending: { en: "High Risk Waiting", hi: "ज़्यादा खतरे वाले", mr: "जास्त धोक्याचे" },
  resolvedWeek: { en: "Resolved", hi: "ठीक हुए", mr: "बरे झाले" },
  incomingAlerts: { en: "Incoming Cases", hi: "आए हुए केस", mr: "आलेले रुग्ण" },
  noPending: { en: "No pending cases.", hi: "कोई केस बाकी नहीं।", mr: "प्रलंबित रुग्ण नाहीत." },
  symptomsLabel: { en: "Symptoms", hi: "लक्षण", mr: "लक्षणे" },
  diagnosisLabel: { en: "Confirm disease", hi: "बीमारी चुनें", mr: "आजार निवडा" },
  treatmentPlaceholder: { en: "Write the treatment...", hi: "इलाज लिखें...", mr: "उपचार लिहा..." },
  confirmResolve: {
    en: "Confirm & Mark Resolved",
    hi: "पुष्टि करें और पूरा करें",
    mr: "निश्चित करा आणि पूर्ण करा",
  },
  recentlyResolved: { en: "Recently Resolved", hi: "हाल में ठीक हुए", mr: "अलीकडे बरे झालेले" },
  nothingResolved: { en: "Nothing resolved yet.", hi: "अभी कुछ पूरा नहीं हुआ।", mr: "अद्याप काही पूर्ण नाही." },
  callFarmer: { en: "Call farmer", hi: "किसान को कॉल करें", mr: "शेतकऱ्याला कॉल करा" },

  // gov
  outbreakAlert: { en: "Outbreak Alert", hi: "फैलाव की चेतावनी", mr: "प्रादुर्भाव इशारा" },
  outbreakText: {
    en: "reported cases crossed the district limit. Send a mobile vet unit.",
    hi: "मामले ज़िले की सीमा से ऊपर हैं। मोबाइल पशु टीम भेजें।",
    mr: "प्रकरणे जिल्ह्याच्या मर्यादेपेक्षा जास्त. फिरते पशुपथक पाठवा.",
  },
  hotspotMap: { en: "Disease Hotspot Map", hi: "बीमारी के इलाके", mr: "आजाराचे क्षेत्र" },
  trendTitle: { en: "Disease Trend — Last 7 Days", hi: "पिछले 7 दिन का हाल", mr: "मागील 7 दिवसांचा कल" },
  regionalSummary: { en: "Village Summary", hi: "गाँव का सारांश", mr: "गावाचा सारांश" },
  village: { en: "Village", hi: "गाँव", mr: "गाव" },
  cases: { en: "Cases", hi: "मामले", mr: "प्रकरणे" },
  outbreaks: { en: "Outbreaks", hi: "फैलाव", mr: "प्रादुर्भाव" },
  vetCoverage: { en: "Vet %", hi: "डॉक्टर %", mr: "डॉक्टर %" },
  high: { en: "High", hi: "ज़्यादा", mr: "जास्त" },
  medium: { en: "Medium", hi: "मध्यम", mr: "मध्यम" },
  low: { en: "Low", hi: "कम", mr: "कमी" },

  // alerts page
  myAlerts: { en: "My Alerts", hi: "मेरी चेतावनी", mr: "माझ्या सूचना" },
  noAlerts: { en: "No active alerts.", hi: "कोई चेतावनी नहीं।", mr: "कोणतीही सूचना नाही." },
  needAttention: { en: "Animals Needing Care", hi: "ध्यान देने वाले पशु", mr: "लक्ष देण्याजोगी जनावरे" },
  regionalAlerts: { en: "Village Outbreak Alerts", hi: "गाँव की चेतावनी", mr: "गावातील इशारे" },
  reported: { en: "Reported", hi: "बताया गया", mr: "कळवले" },
  activeOutbreaks: { en: "active outbreak(s)", hi: "चालू फैलाव", mr: "चालू प्रादुर्भाव" },
  coverage: { en: "vet coverage", hi: "डॉक्टर उपलब्धता", mr: "डॉक्टर उपलब्धता" },

  // profile
  activity: { en: "Activity", hi: "गतिविधि", mr: "हालचाल" },
  demoNote: {
    en: "Demo app — information stays on this phone only",
    hi: "डेमो ऐप — जानकारी सिर्फ इसी फोन में रहती है",
    mr: "डेमो अ‍ॅप — माहिती फक्त याच फोनमध्ये राहते",
  },
  help: { en: "Need help?", hi: "मदद चाहिए?", mr: "मदत हवी?" },
  helpText: {
    en: "Call the free helpline 1962 to speak with an animal doctor.",
    hi: "पशु डॉक्टर से बात करने के लिए मुफ़्त हेल्पलाइन 1962 पर कॉल करें।",
    mr: "पशु डॉक्टरशी बोलण्यासाठी मोफत हेल्पलाइन 1962 वर कॉल करा.",
  },

  // login / role gate
  welcome: { en: "Welcome to PashuParvah", hi: "पशुपरवाह में आपका स्वागत है", mr: "पशुपरवाहमध्ये स्वागत आहे" },
  chooseRoleTitle: { en: "Who are you?", hi: "आप कौन हैं?", mr: "तुम्ही कोण आहात?" },
  chooseRoleHint: {
    en: "\n",
    hi: "आगे बढ़ने के लिए अपनी तस्वीर दबाएं। बाद में बदल सकते हैं।",
    mr: "पुढे जाण्यासाठी तुमचे चित्र दाबा. नंतर बदलू शकता.",
  },
  switchRole: { en: "Switch role", hi: "भूमिका बदलें", mr: "भूमिका बदला" },
  loggedInAs: { en: "Signed in as", hi: "आप हैं", mr: "तुम्ही आहात" },

  // login / signup
  loginTitle: { en: "Sign in", hi: "लॉगिन करें", mr: "लॉगिन करा" },
  signupTitle: { en: "Create your account", hi: "नया खाता बनाएं", mr: "नवीन खाते तयार करा" },
  loginHint: {
    en: "Enter your phone number and PIN to continue.",
    hi: "आगे बढ़ने के लिए अपना फोन नंबर और पिन डालें।",
    mr: "पुढे जाण्यासाठी तुमचा फोन नंबर आणि पिन टाका.",
  },
  signupHint: {
    en: "First time here? Fill these three details once.",
    hi: "पहली बार आए हैं? ये तीन बातें एक बार भरें।",
    mr: "पहिल्यांदा आलात? ही तीन माहिती एकदा भरा.",
  },
  fullName: { en: "Your name", hi: "आपका नाम", mr: "तुमचे नाव" },
  phone: { en: "Phone number (10 digits)", hi: "फोन नंबर (10 अंक)", mr: "फोन क्रमांक (10 अंक)" },
  pin: { en: "4-digit PIN", hi: "4 अंकों का पिन", mr: "4 अंकी पिन" },
  loginBtn: { en: "Sign in", hi: "लॉगिन", mr: "लॉगिन" },
  signupBtn: { en: "Create account", hi: "खाता बनाएं", mr: "खाते तयार करा" },
  toSignup: { en: "New here? Create an account", hi: "नए हैं? खाता बनाएं", mr: "नवीन आहात? खाते तयार करा" },
  toLogin: { en: "Already have an account? Sign in", hi: "पहले से खाता है? लॉगिन करें", mr: "आधीच खाते आहे? लॉगिन करा" },
  backToRoles: { en: "Back", hi: "वापस", mr: "मागे" },
  errFields: { en: "Please fill all the boxes.", hi: "कृपया सभी खाने भरें।", mr: "कृपया सर्व रकाने भरा." },
  errPhone: { en: "Phone number must be 10 digits.", hi: "फोन नंबर 10 अंकों का होना चाहिए।", mr: "फोन क्रमांक 10 अंकी हवा." },
  errPin: { en: "PIN must be 4 digits.", hi: "पिन 4 अंकों का होना चाहिए।", mr: "पिन 4 अंकी हवा." },
  errNoUser: { en: "No account found. Please create one.", hi: "खाता नहीं मिला। कृपया नया बनाएं।", mr: "खाते सापडले नाही. कृपया नवीन तयार करा." },
  errWrongPin: { en: "Wrong PIN. Please try again.", hi: "पिन गलत है। फिर कोशिश करें।", mr: "पिन चुकीचा आहे. पुन्हा प्रयत्न करा." },
  errExists: { en: "This number already has an account. Please sign in.", hi: "इस नंबर का खाता पहले से है। लॉगिन करें।", mr: "या क्रमांकाचे खाते आधीच आहे. लॉगिन करा." },
  logout: { en: "Log out", hi: "लॉग आउट", mr: "लॉग आउट" },
  signOut: { en: "Sign Out", hi: "साइन आउट", mr: "साइन आउट" },
  installApp: { en: "Install App", hi: "ऐप इंस्टॉल करें", mr: "ॲप इन्स्टॉल करा" },
  listenPage: { en: "Listen", hi: "सुनें", mr: "ऐका" },
  stopListen: { en: "Stop", hi: "रोकें", mr: "थांबवा" },
  listenHint: { en: "Tap to hear", hi: "सुनने के लिए दबाएँ", mr: "ऐकण्यासाठी दाबा" },
} as const;


export type TKey = keyof typeof dict;

export function t(key: TKey, lang: Lang): string {
  return dict[key][lang];
}

const species = {
  Cow: { en: "Cow", hi: "गाय", mr: "गाय" },
  Buffalo: { en: "Buffalo", hi: "भैंस", mr: "म्हैस" },
  Goat: { en: "Goat", hi: "बकरी", mr: "शेळी" },
  Sheep: { en: "Sheep", hi: "भेड़", mr: "मेंढी" },
  Poultry: { en: "Poultry", hi: "मुर्गी", mr: "कोंबडी" },
} as const;

export function tSpecies(value: string, lang: Lang): string {
  return (species as Record<string, Record<Lang, string>>)[value]?.[lang] ?? value;
}

const symptoms: Record<string, Record<Lang, string>> = {
  Fever: { en: "Fever", hi: "बुखार", mr: "ताप" },
  "Loss of appetite": { en: "Loss of appetite", hi: "चारा न खाना", mr: "चारा न खाणे" },
  Lameness: { en: "Lameness", hi: "लंगड़ाना", mr: "लंगडणे" },
  "Nasal discharge": { en: "Nasal discharge", hi: "नाक बहना", mr: "नाक गळणे" },
  Diarrhea: { en: "Diarrhea", hi: "दस्त", mr: "जुलाब" },
  "Skin lesions": { en: "Skin lesions", hi: "त्वचा पर घाव", mr: "त्वचेवर जखमा" },
  "Drop in milk yield": { en: "Drop in milk yield", hi: "दूध कम होना", mr: "दूध कमी होणे" },
  "Excess salivation": { en: "Excess salivation", hi: "मुँह से लार", mr: "तोंडातून लाळ" },
  Coughing: { en: "Coughing", hi: "खाँसी", mr: "खोकला" },
  "Swollen udder": { en: "Swollen udder", hi: "थन में सूजन", mr: "कासेला सूज" },
};

export function tSymptom(value: string, lang: Lang): string {
  return symptoms[value]?.[lang] ?? value;
}

const diseases: Record<string, Record<Lang, string>> = {
  "Foot & Mouth Disease (FMD)": {
    en: "Foot & Mouth Disease (FMD)",
    hi: "खुरपका-मुँहपका (FMD)",
    mr: "लाळ्या खुरकूत (FMD)",
  },
  Mastitis: { en: "Mastitis", hi: "थनैला (मैस्टाइटिस)", mr: "कासदाह (मॅस्टायटिस)" },
  "Peste des Petits Ruminants (PPR)": {
    en: "Peste des Petits Ruminants (PPR)",
    hi: "पीपीआर (बकरी प्लेग)",
    mr: "पीपीआर (शेळी प्लेग)",
  },
  "Haemorrhagic Septicaemia": { en: "Haemorrhagic Septicaemia", hi: "गलघोंटू", mr: "घटसर्प" },
  Bloat: { en: "Bloat", hi: "अफारा", mr: "पोट फुगणे" },
  "Lumpy Skin Disease": { en: "Lumpy Skin Disease", hi: "लंपी त्वचा रोग", mr: "लंपी त्वचा रोग" },
};

export function tDisease(value: string, lang: Lang): string {
  return diseases[value]?.[lang] ?? value;
}

const villages: Record<string, Record<Lang, string>> = {
  Shirpur: { en: "Shirpur", hi: "शिरपुर", mr: "शिरपूर" },
  Warud: { en: "Warud", hi: "वरुड", mr: "वरुड" },
  Kolhewadi: { en: "Kolhewadi", hi: "कोल्हेवाड़ी", mr: "कोल्हेवाडी" },
};

export function tVillage(value: string, lang: Lang): string {
  return villages[value]?.[lang] ?? value;
}

const days: Record<string, Record<Lang, string>> = {
  Mon: { en: "Mon", hi: "सोम", mr: "सोम" },
  Tue: { en: "Tue", hi: "मंगल", mr: "मंगळ" },
  Wed: { en: "Wed", hi: "बुध", mr: "बुध" },
  Thu: { en: "Thu", hi: "गुरु", mr: "गुरु" },
  Fri: { en: "Fri", hi: "शुक्र", mr: "शुक्र" },
  Sat: { en: "Sat", hi: "शनि", mr: "शनि" },
  Sun: { en: "Sun", hi: "रवि", mr: "रवि" },
};

export function tDay(value: string, lang: Lang): string {
  return days[value]?.[lang] ?? value;
}

const people: Record<string, Record<Lang, string>> = {
  "Ramesh Patil": { en: "Ramesh Patil", hi: "रमेश पाटील", mr: "रमेश पाटील" },
  "Sunita Deshmukh": { en: "Sunita Deshmukh", hi: "सुनीता देशमुख", mr: "सुनीता देशमुख" },
  "Anil Jadhav": { en: "Anil Jadhav", hi: "अनिल जाधव", mr: "अनिल जाधव" },
  "Dr. Meera Kulkarni": { en: "Dr. Meera Kulkarni", hi: "डॉ. मीरा कुलकर्णी", mr: "डॉ. मीरा कुलकर्णी" },
  "District Animal Husbandry": {
    en: "District Animal Husbandry",
    hi: "जिला पशुपालन विभाग",
    mr: "जिल्हा पशुसंवर्धन विभाग",
  },
  Gauri: { en: "Gauri", hi: "गौरी", mr: "गौरी" },
  Kalu: { en: "Kalu", hi: "कालू", mr: "काळू" },
  Moti: { en: "Moti", hi: "मोती", mr: "मोती" },
  Chandni: { en: "Chandni", hi: "चाँदनी", mr: "चांदणी" },
  Bali: { en: "Bali", hi: "बाली", mr: "बाली" },
  "Coop A": { en: "Coop A", hi: "दड़बा A", mr: "खुराडे A" },
};

export function tName(value: string, lang: Lang): string {
  return people[value]?.[lang] ?? value;
}

const notes: Record<string, Record<Lang, string>> = {
  "FMD Vaccine — Dose 1": { en: "FMD Vaccine — Dose 1", hi: "एफएमडी टीका — पहली खुराक", mr: "एफएमडी लस — पहिला डोस" },
  "Mild mastitis": { en: "Mild mastitis", hi: "हल्का थनैला", mr: "सौम्य कासदाह" },
  "Resolved in 6 days": { en: "Resolved in 6 days", hi: "6 दिन में ठीक हुआ", mr: "6 दिवसांत बरे झाले" },
  "Intramammary antibiotic course": {
    en: "Intramammary antibiotic course",
    hi: "थन में एंटीबायोटिक कोर्स",
    mr: "कासेत प्रतिजैविक उपचार",
  },
  "HS Vaccine": { en: "HS Vaccine", hi: "गलघोंटू टीका", mr: "घटसर्प लस" },
  "High fever + lameness reported": {
    en: "High fever + lameness reported",
    hi: "तेज़ बुखार और लंगड़ाना बताया गया",
    mr: "जास्त ताप आणि लंगडणे कळवले",
  },
  "PPR Vaccine": { en: "PPR Vaccine", hi: "पीपीआर टीका", mr: "पीपीआर लस" },
  "Loose motions": { en: "Loose motions", hi: "पतले दस्त", mr: "पातळ जुलाब" },
  "Under observation": { en: "Under observation", hi: "निगरानी में", mr: "निरीक्षणाखाली" },
  "Deworming + FMD booster": {
    en: "Deworming + FMD booster",
    hi: "कृमिनाशक + एफएमडी बूस्टर",
    mr: "जंतनाशक + एफएमडी बूस्टर",
  },
  "Hoof trimming": { en: "Hoof trimming", hi: "खुर की कटाई", mr: "खूर कापणी" },
  "Ranikhet Disease vaccine": { en: "Ranikhet Disease vaccine", hi: "रानीखेत टीका", mr: "राणीखेत लस" },
  "Reduced feed intake in 4 birds": {
    en: "Reduced feed intake in 4 birds",
    hi: "4 पक्षियों ने दाना कम खाया",
    mr: "4 पक्ष्यांनी खाद्य कमी खाल्ले",
  },
  "FMD Booster": { en: "FMD Booster", hi: "एफएमडी बूस्टर", mr: "एफएमडी बूस्टर" },
  "PPR Booster": { en: "PPR Booster", hi: "पीपीआर बूस्टर", mr: "पीपीआर बूस्टर" },
  "Ranikhet Dose 2": { en: "Ranikhet Dose 2", hi: "रानीखेत दूसरी खुराक", mr: "राणीखेत दुसरा डोस" },
  Deworming: { en: "Deworming", hi: "कृमिनाशक दवा", mr: "जंतनाशक औषध" },
  "Intramammary antibiotics for 5 days, warm compress twice daily.": {
    en: "Intramammary antibiotics for 5 days, warm compress twice daily.",
    hi: "5 दिन तक थन में एंटीबायोटिक, दिन में दो बार गर्म सिंकाई।",
    mr: "5 दिवस कासेत प्रतिजैविक, दिवसातून दोनदा गरम शेक.",
  },
};

export function tText(value: string, lang: Lang): string {
  return notes[value]?.[lang] ?? value;
}

const ageUnits: [RegExp, Record<Lang, string>][] = [
  [/\byrs?\b|\byears?\b/gi, { en: "yrs", hi: "साल", mr: "वर्षे" }],
  [/\bmonths?\b/gi, { en: "months", hi: "महीने", mr: "महिने" }],
];

export function tAge(value: string, lang: Lang): string {
  let out = value;
  for (const [re, map] of ageUnits) out = out.replace(re, map[lang]);
  return out;
}
