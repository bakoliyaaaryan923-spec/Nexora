<!DOCTYPE html><html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nexora AI — Free Local</title><style>
*{box-sizing:border-box;margin:0;padding:0}

body{
  font-family:Inter,Arial,sans-serif;
  background:#090b10;
  color:#f5f7fb;
  min-height:100vh;
}

button,textarea,input{font:inherit}

.app{
  min-height:100vh;
  display:flex;
}

.sidebar{
  width:250px;
  background:#10131a;
  border-right:1px solid #252a34;
  padding:18px 14px;
  display:flex;
  flex-direction:column;
  gap:15px;
}

.logo{
  font-size:21px;
  font-weight:800;
  padding:8px;
}

.logo span{
  color:#897cff;
}

.new-chat{
  width:100%;
  padding:12px;
  border-radius:12px;
  border:1px solid #303541;
  background:#191c24;
  color:white;
  cursor:pointer;
  text-align:left;
}

.new-chat:hover{
  background:#222631;
}

.history-title{
  color:#777e8c;
  font-size:11px;
  padding:8px;
  text-transform:uppercase;
  letter-spacing:.1em;
}

.history{
  display:flex;
  flex-direction:column;
  gap:4px;
  overflow:auto;
}

.history-item{
  width:100%;
  border:0;
  background:transparent;
  color:#cdd2dc;
  padding:10px;
  border-radius:9px;
  text-align:left;
  cursor:pointer;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}

.history-item:hover{
  background:#1b1f28;
}

.sidebar-bottom{
  margin-top:auto;
  color:#656c79;
  font-size:11px;
  padding:8px;
}

.main{
  flex:1;
  min-width:0;
  min-height:100vh;
  display:flex;
  flex-direction:column;
}

.topbar{
  height:62px;
  border-bottom:1px solid #252a34;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 22px;
  background:#0d0f14;
}

.brand{
  font-weight:700;
}

.status{
  color:#62e3a0;
  font-size:12px;
}

.content{
  width:min(900px,94%);
  margin:auto;
  padding:50px 0 175px;
}

.hero{
  text-align:center;
  margin-bottom:30px;
}

.hero h1{
  font-size:clamp(34px,6vw,58px);
  line-height:1.05;
  margin-bottom:12px;
  background:linear-gradient(90deg,#fff,#aaa0ff);
  -webkit-background-clip:text;
  color:transparent;
}

.hero p{
  color:#9299a7;
}

.chat{
  display:flex;
  flex-direction:column;
  gap:16px;
}

.welcome{
  text-align:center;
  color:#8c93a0;
  padding:28px 10px;
}

.welcome strong{
  display:block;
  color:white;
  font-size:20px;
  margin-bottom:8px;
}

.message{
  max-width:84%;
  padding:14px 16px;
  border-radius:16px;
  line-height:1.6;
  white-space:pre-wrap;
  overflow-wrap:anywhere;
}

.user{
  margin-left:auto;
  background:#6256d8;
  border-bottom-right-radius:5px;
}

.assistant{
  margin-right:auto;
  background:#171a22;
  border:1px solid #292e38;
  border-bottom-left-radius:5px;
}

.tools{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:9px;
  margin-top:25px;
}

.tool{
  padding:13px 8px;
  border-radius:12px;
  border:1px solid #292e38;
  background:#14171e;
  color:#e9ebf0;
  cursor:pointer;
}

.tool:hover{
  background:#1c2029;
  border-color:#675cdc;
}

.tool small{
  display:block;
  color:#7d8492;
  margin-top:4px;
}

.composer-wrap{
  position:fixed;
  left:250px;
  right:0;
  bottom:0;
  padding:14px 20px 18px;
  background:linear-gradient(transparent,#090b10 25%);
}

.composer{
  width:min(900px,94%);
  margin:auto;
  display:flex;
  align-items:flex-end;
  gap:8px;
  padding:9px;
  background:#151820;
  border:1px solid #303541;
  border-radius:17px;
  box-shadow:0 12px 40px rgba(0,0,0,.35);
}

textarea{
  flex:1;
  min-height:46px;
  max-height:150px;
  resize:none;
  border:0;
  outline:0;
  background:transparent;
  color:white;
  padding:12px;
}

textarea::placeholder{
  color:#707785;
}

.clear{
  border:0;
  background:transparent;
  color:#858c99;
  cursor:pointer;
  padding:11px;
}

.clear:hover{
  color:white;
}

.send{
  width:47px;
  height:46px;
  border:0;
  border-radius:12px;
  background:#6b5fe5;
  color:white;
  cursor:pointer;
  font-size:18px;
}

.send:hover{
  background:#796df0;
}

.notice{
  text-align:center;
  color:#555c68;
  font-size:10px;
  margin-top:7px;
}

@media(max-width:760px){
  .sidebar{
    display:none;
  }

  .composer-wrap{
    left:0;
  }

  .content{
    padding-top:35px;
  }

  .tools{
    grid-template-columns:repeat(2,1fr);
  }

  .message{
    max-width:93%;
  }
}
</style></head><body><div class="app"><aside class="sidebar">  <div class="logo">NEXORA <span>AI</span></div>  <button class="new-chat" onclick="newChat()">
    ＋ New chat
  </button>  <div class="history-title">History</div>  <div id="history" class="history"></div>  <div class="sidebar-bottom">
    FREE LOCAL MODE<br>
    No API required
  </div></aside><main class="main"><header class="topbar">
  <div class="brand">Nexora AI</div>
  <div class="status">● Local Ready</div>
</header><section class="content">  <div class="hero">
    <h1>Ask anything.</h1>
    <p>Useful AI-style tools that work directly in your browser.</p>
  </div>  <div id="chat" class="chat"><div id="welcome" class="welcome">
  <strong>Welcome to Nexora AI</strong>
  Ask a question or choose a tool below.
</div>

  </div>  <div class="tools"><button class="tool" onclick="chooseTool('ask')">
  🧠 Ask
  <small>Ask a question</small>
</button>

<button class="tool" onclick="chooseTool('learn')">
  📚 Learn
  <small>Explain a topic</small>
</button>

<button class="tool" onclick="chooseTool('write')">
  ✍️ Write
  <small>Writing helper</small>
</button>

<button class="tool" onclick="chooseTool('solve')">
  🧮 Solve
  <small>Calculator</small>
</button>

  </div></section></main>
</div><div class="composer-wrap">  <div class="composer"><textarea
  id="question"
  placeholder="Ask Nexora anything..."
  rows="1"
  onkeydown="handleKey(event)"
></textarea>

<button class="clear" onclick="clearChat()">
  Clear
</button>

<button class="send" onclick="sendMessage()">
  ➤
</button>

  </div>  <div class="notice">
    © 2026 Nexora AI · Free Local Mode
  </div></div><script>

const chat=document.getElementById("chat");
const box=document.getElementById("question");
const historyBox=document.getElementById("history");

let historyData=[];

function addMessage(text,type){

  const welcome=document.getElementById("welcome");

  if(welcome){
    welcome.remove();
  }

  const div=document.createElement("div");

  div.className="message "+type;
  div.textContent=text;

  chat.appendChild(div);

  window.scrollTo({
    top:document.body.scrollHeight,
    behavior:"smooth"
  });

  return div;
}

function addHistory(text){

  historyData.unshift(text);

  const item=document.createElement("button");

  item.className="history-item";
  item.textContent=text;

  item.onclick=function(){
    box.value=text;
    box.focus();
  };

  historyBox.prepend(item);
}

function newChat(){

  chat.innerHTML=`
    <div id="welcome" class="welcome">
      <strong>Welcome to Nexora AI</strong>
      Ask a question or choose a tool below.
    </div>
  `;

  box.value="";
  box.focus();
}

function clearChat(){
  newChat();
}

function handleKey(event){

  if(event.key==="Enter" && !event.shiftKey){
    event.preventDefault();
    sendMessage();
  }
}

function chooseTool(type){

  const prompts={
    ask:"",
    learn:"Explain this topic in simple language: ",
    write:"Help me write: ",
    solve:"Calculate: "
  };

  box.value=prompts[type] ?? "";
  box.focus();
}

function calculate(expression){

  let value=expression
    .replace(/×/g,"*")
    .replace(/÷/g,"/")
    .replace(/\s/g,"");

  if(!/^[0-9+\-*/().%]+$/.test(value)){
    return null;
  }

  try{

    const result=Function(
      '"use strict";return ('+value+')'
    )();

    if(
      typeof result==="number" &&
      Number.isFinite(result)
    ){
      return result;
    }

  }catch(error){}

  return null;
}

function localKnowledge(question){

  const q=question.toLowerCase().trim();

  /* CALCULATOR */

  const result=calculate(question);

  if(result!==null){
    return "🧮 Answer: "+result;
  }

  /* GREETING */

  if(
    q==="hi" ||
    q==="hello" ||
    q==="hey" ||
    q==="नमस्ते"
  ){
    return "नमस्ते! मैं Nexora AI हूँ। अपना सवाल पूछिए।";
  }

  /* INDIA */

  if(
    q.includes("bharat ki rajdhani") ||
    q.includes("india ki capital") ||
    q.includes("capital of india")
  ){
    return `भारत की राजधानी नई दिल्ली (New Delhi) है।

नई दिल्ली भारत की राष्ट्रीय राजधानी है।

3 महत्वपूर्ण बातें:
1. यहाँ भारत की संसद स्थित है।
2. राष्ट्रपति भवन नई दिल्ली में है।
3. भारत सरकार के कई प्रमुख केंद्रीय कार्यालय यहीं स्थित हैं।`;
  }

  /* RAJASTHAN */

  if(
    q.includes("rajasthan ki rajdhani") ||
    q.includes("rajasthan capital")
  ){
    return `राजस्थान की राजधानी जयपुर (Jaipur) है।

जयपुर को "Pink City" के नाम से भी जाना जाता है।

यह राजस्थान का प्रमुख प्रशासनिक, ऐतिहासिक और पर्यटन केंद्र है।`;
  }

  /* INDIA COUNTRY */

  if(
    q==="bharat" ||
    q==="india" ||
    q.includes("about india") ||
    q.includes("bharat ke bare")
  ){
    return `भारत दक्षिण एशिया का एक विशाल देश है।

मुख्य जानकारी:
• राजधानी: नई दिल्ली
• मुद्रा: भारतीय रुपया (₹)
• क्षेत्र: दक्षिण एशिया
• शासन व्यवस्था: संघीय संसदीय लोकतंत्र

भारत अपनी विविध भाषाओं, संस्कृतियों, इतिहास और भौगोलिक विविधता के लिए प्रसिद्ध है।`;
  }

  /* RAJASTHAN */

  if(
    q==="rajasthan" ||
    q.includes("about rajasthan") ||
    q.includes("rajasthan ke bare")
  ){
    return `राजस्थान भारत के उत्तर-पश्चिमी भाग में स्थित राज्य है।

मुख्य जानकारी:
• राजधानी: जयपुर
• प्रसिद्ध नाम: Land of Kings
• प्रमुख क्षेत्र: थार मरुस्थल
• प्रसिद्ध स्थल: आमेर किला, सिटी पैलेस और उदयपुर के झील क्षेत्र`;
  }

  /* DELHI */

  if(
    q==="new delhi" ||
    q==="नई दिल्ली" ||
    q.includes("new delhi ke bare")
  ){
    return `नई दिल्ली भारत की राजधानी है।

यह भारत के राष्ट्रीय राजनीतिक और प्रशासनिक केंद्रों में से एक है। संसद भवन, राष्ट्रपति भवन और कई केंद्रीय सरकारी संस्थान यहाँ स्थित हैं।`;
  }

  /* EARTH */

  if(
    q.includes("earth") ||
    q.includes("prithvi") ||
    q.includes("पृथ्वी")
  ){
    return `पृथ्वी सूर्य से तीसरा ग्रह है।

पृथ्वी की सतह पर बड़ी मात्रा में तरल जल है और यहाँ जीवन के लिए उपयुक्त वातावरण मौजूद है।

पृथ्वी का एक प्राकृतिक उपग्रह है — चंद्रमा।`;
  }

  /* SUN */

  if(
    q==="sun" ||
    q.includes("surya") ||
    q.includes("सूर्य")
  ){
    return `सूर्य हमारे सौरमंडल का तारा है।

यह पृथ्वी के लिए प्रकाश और ऊर्जा का मुख्य स्रोत है।

सूर्य के चारों ओर पृथ्वी सहित कई ग्रह परिक्रमा करते हैं।`;
  }

  /* COMPUTER */

  if(
    q.includes("computer kya hai") ||
    q.includes("what is computer")
  ){
    return `कंप्यूटर एक electronic device है जो data को process करके उपयोगी information देता है।

इसके मुख्य काम हैं:
1. Input लेना
2. Data process करना
3. Information output देना
4. Data store करना`;
  }

  /* AI */

  if(
    q.includes("ai kya hai") ||
    q.includes("what is ai") ||
    q.includes("artificial intelligence")
  ){
    return `Artificial Intelligence (AI) ऐसी technology है जिसमें computer systems ऐसे काम कर सकते हैं जिनमें सामान्यतः human intelligence की जरूरत होती है।

उदाहरण:
• भाषा समझना
• सवालों का जवाब देना
• images पहचानना
• patterns ढूँढना
• predictions करना`;
  }

  /* SPACE */

  if(
    q.includes("solar system") ||
    q.includes("saur mandal") ||
    q.includes("सौर मंडल")
  ){
    return `सौर मंडल सूर्य और उसके चारों ओर घूमने वाले ग्रहों, उनके चंद्रमाओं, asteroids और अन्य objects का समूह है।

हमारे सौर मंडल में 8 ग्रह हैं:
Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus और Neptune।`;
  }

  /* WATER */

  if(
    q.includes("water formula") ||
    q.includes("pani ka formula") ||
    q.includes("पानी का सूत्र")
  ){
    return "पानी का रासायनिक सूत्र H₂O है। इसका एक molecule दो hydrogen atoms और एक oxygen atom से बना होता है।";
  }

  /* WRITING */

  if(
    q.startsWith("write a paragraph") ||
    q.startsWith("write paragraph")
  ){
    return "Writing helper: अपना विषय बताइए, जैसे “पर्यावरण संरक्षण पर paragraph लिखो।”";
  }

  /* LEARNING */

  if(
    q.startsWith("explain") ||
    q.startsWith("explain this")
  ){
    return "Learn mode: जिस topic को समझना है उसका नाम लिखिए। उदाहरण: “Explain photosynthesis in simple language.”";
  }

  /* FALLBACK */

  return `मैं अभी Free Local Mode में चल रहा हूँ।

इस version में सामान्य जानकारी, calculations और कई common topics बिना API के काम करते हैं।

आप इनमें से कुछ पूछ सकते हैं:
• भारत की राजधानी क्या है?
• राजस्थान की राजधानी क्या है?
• AI क्या है?
• पृथ्वी क्या है?
• पानी का formula क्या है?
• 25 × 12
• सौर मंडल क्या है?

बाद में किसी AI provider को जोड़कर सामान्य सवालों के लिए भी real AI answers जोड़े जा सकते हैं।`;
}

function sendMessage(){

  const question=box.value.trim();

  if(!question){
    return;
  }

  addMessage(question,"user");
  addHistory(question);

  box.value="";

  const answer=localKnowledge(question);

  setTimeout(function(){

    addMessage(answer,"assistant");

  },220);
}

</script></body>
</html>