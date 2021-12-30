let i=0;
let score=0,highscore=0;
let value,correctAnswer,highscorename;

let opentriviaurl="https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple";

async function getData() {
    let resp=await fetch(opentriviaurl);
    let respjson = await resp.json();
    let questionanswer=await respjson.results[i];
    return questionanswer;
    
}

const blrand = function(min, max, blacklist) {
    if(!blacklist)
        blacklist = []
    let rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    let retv = 0;
    while(blacklist.indexOf(retv = rand(min,max)) > -1) { }
    return retv;
}

function setValue(ele) {
    let opt1span=document.querySelector(".option1 span");
    opt1span.innerText="A "; 
    let opt2span=document.querySelector(".option2 span");
    opt2span.innerText="B "; 
    let opt3span=document.querySelector(".option3 span");
    opt3span.innerText="C "; 
    let opt4span=document.querySelector(".option4 span");
    opt4span.innerText="D "; 
    value=ele.value;
    ele.innerHTML="<span class='opt'>✓ </span>"+value;
}

function getNextQuestion()
{
    if(value===correctAnswer)
    {
        score+=10;
    }
    i=i+1;
    if(i!=10)
    {
        displaycontent();
    }
    else{
        
        displayscore();
    }
}


function stoppedTyping(){
    console.log(document.getElementById("username").value.length)
    if(document.getElementById("username").value.length > 0) { 
        document.getElementById('savebutton').disabled = false; 
    } else { 
        document.getElementById('savebutton').disabled = true;
    }
}

function setHighscore(){
    if(score>highscore)
    {
        highscore=score;
        highscorename=document.getElementById("username").value;       
    }
    i=0;score=0;
    alert("Thanks. Score has been saved")
}

function getindexpage(){
    let body=document.body;
    body.innerHTML="";
    let maindiv=document.createElement("div");
    maindiv.classList.add("container","maindiv");
    maindiv.setAttribute("class","layout");
    
    let quiztitle=document.createElement("h1");
    quiztitle.innerText="Qestions Corner";
    quiztitle.setAttribute("class","quiztitle");
    
    let playbutton=document.createElement("button");
    playbutton.setAttribute("class","playbutton");
    playbutton.setAttribute("id","play");
    playbutton.innerText="Start";
    playbutton.setAttribute("onclick","playgame()")
    playbutton.setAttribute("type","button");
    
    let highscorebutton=document.createElement("button");
    highscorebutton.setAttribute("class","highscorebutton");
    highscorebutton.setAttribute("id","highScores");
    highscorebutton.setAttribute("onclick","displayhighscore()")
    highscorebutton.innerText="Score Board";
    highscorebutton.setAttribute("type","button");
    
    maindiv.append(quiztitle,playbutton,highscorebutton);
    
    body.appendChild(maindiv);
}
    
getindexpage();

function playgame(){
    displaycontent();
}

function displayhighscore(){
    let body=document.body;
    body.innerHTML="";
    let Highscorediv=document.createElement("div");
    Highscorediv.setAttribute("class","highscorediv container");
    let hshtitle=document.createElement("div");
    hshtitle.setAttribute("class","hs");
    hshtitle.innerText="High Scores";
    let hscontent=document.createElement("div");
    hscontent.setAttribute("class","hscontent");
    if(highscorename==undefined)
    hscontent.innerText="Highscore yet to be set"
    else
    {
        hscontent.innerText=highscorename+": "+highscore;
    }

    let goHomeButton=document.createElement("button");
    goHomeButton.setAttribute("class","goHomeButton");
    goHomeButton.setAttribute("id","highScores");
    goHomeButton.innerText="Go Home";
    goHomeButton.setAttribute("onclick","getindexpage()")
    goHomeButton.setAttribute("type","button");

    
    Highscorediv.append(hshtitle,hscontent,goHomeButton);
    body.appendChild(Highscorediv);
}



function getHeaderContent() {
    let headerdiv=document.createElement("div");
    headerdiv.setAttribute("class","headerdiv container");
    let progressdiv=document.createElement("div");
    progressdiv.setAttribute("class","progressdiv container");
    let progressdivtext=document.createElement("span");
    progressdivtext.setAttribute("id","progressText container");
    progressdivtext.innerText='Question '+(i+1)+'/10';
    let br=document.createElement("br");
    // let progreessiveinputrange=document.createElement("input");
    // progreessiveinputrange.setAttribute("class","inputrange");
    // progreessiveinputrange.setAttribute("type","range");
    // progreessiveinputrange.setAttribute("min",0);
    // progreessiveinputrange.setAttribute("max",10);
    // progreessiveinputrange.setAttribute("value",i+1);
    // progreessiveinputrange.setAttribute("disabled","true");
    progressdiv.append(progressdivtext);
    
    let scorediv=document.createElement("div");
    scorediv.setAttribute("class","scorediv container");
    let scoretexthead=document.createElement("div");
    scoretexthead.setAttribute("class","scoretextheader container");
    scoretexthead.innerText="Score  "+score;
    scorediv.append(scoretexthead);
    
    headerdiv.append(progressdiv,scorediv);
    return headerdiv;
}


async function displayQuestion(){
let questiondiv=document.createElement("div");
questiondiv.setAttribute("class","questiondiv container");

let question=document.createElement("div");
question.setAttribute("class","question");
let data=await getData();
question.innerText=data.question;

let answer=document.createElement("div");
answer.setAttribute("class","answer");
let ansarr=[data.correct_answer,data.incorrect_answers[0],data.incorrect_answers[1],data.incorrect_answers[2]];
correctAnswer=data.correct_answer;
let br1=document.createElement("br");
let anum=Math.floor(Math.random() * Math.floor(4));
let a=ansarr[anum]; 
let option1=document.createElement("button");
option1.setAttribute("type","button");
option1.setAttribute("class","option1 button");
option1.setAttribute("value",a);
option1.innerHTML="<span class='opt'>A </span>"+a;
option1.setAttribute("onclick","setValue(this)");

let br2=document.createElement("br");
let bnum=blrand(0, 4, [anum]);
let b=ansarr[bnum];
let option2=document.createElement("button");
option2.setAttribute("type","button");
option2.setAttribute("class","option2 button");
option2.setAttribute("value",b);
option2.innerHTML="<span class='opt'>B </span>"+b;
option2.setAttribute("onclick","setValue(this)");


let br3=document.createElement("br");
let cnum=blrand(0, 4, [anum,bnum]);
let c=ansarr[cnum];
let option3=document.createElement("button");
option3.setAttribute("type","button");
option3.setAttribute("class","option3 button");
option3.setAttribute("value",c);
option3.innerHTML="<span class='opt'>C </span>"+c;
option3.setAttribute("onclick","setValue(this)");

let dnum=blrand(0, 4, [anum,bnum,cnum]);
let d=ansarr[dnum];
let option4=document.createElement("button");
option4.setAttribute("type","button");
option4.setAttribute("class","option4 button");
option4.setAttribute("value",d);
option4.innerText=d;
option4.innerHTML="<span class='opt'>D </span>"+d;
option4.setAttribute("onclick","setValue(this)");

answer.append(option1,br1,option2,br2,option3,br3,option4);
questiondiv.append(question,answer);
return questiondiv;
}

function getNextButton(){
    let nextButtondiv=document.createElement("button");
    nextButtondiv.setAttribute("class","nextbuttonDiv");
    nextButtondiv.innerText=(i!=9)?"Next":"Submit";
    nextButtondiv.setAttribute("onclick","getNextQuestion()");
    return nextButtondiv;
}

async function displaycontent(){
    let body=document.body;
    body.innerHTML="";
    let maindiv=document.createElement("div");
    maindiv.classList.add("container","playdiv");
    headerdiv=getHeaderContent();
    questiondiv=await displayQuestion();
    nextButtondiv=getNextButton();
    maindiv.append(headerdiv,questiondiv,nextButtondiv);
    body.appendChild(maindiv);
}


function displayscore()
{
    let body=document.body;
    body.innerHTML="";
    let scoredisplay=document.createElement("div");
    scoredisplay.setAttribute("class","scoredisplay container");
    let scorediv=document.createElement("div");
    scorediv.setAttribute("class","score container");
    if(score<highscore)
    scorediv.innerText="Your score is "+score;
    else
    scorediv.innerText="Congratz!!!You set Highscore. Your score is "+score;
    let inputusernamediv=document.createElement("input");
    inputusernamediv.setAttribute("class","username");
    inputusernamediv.setAttribute("type","text");
    inputusernamediv.setAttribute("placeholder","username")
    inputusernamediv.setAttribute("id","username");
    inputusernamediv.setAttribute("onkeyup","stoppedTyping()");
    inputusernamediv.keyup
    let br1=document.createElement("br")


    let savebuttondiv=document.createElement("button");
    savebuttondiv.setAttribute("id","savebutton");
    savebuttondiv.setAttribute("class","savebutton");
    savebuttondiv.innerText="Save";
    savebuttondiv.setAttribute("onclick","setHighscore()");
    savebuttondiv.setAttribute("disabled","true");

    let playbutton=document.createElement("button");
    playbutton.setAttribute("class","playbutton");
    playbutton.setAttribute("id","playbutton");
    playbutton.innerText="playagain";
    playbutton.setAttribute("onclick","playgame()")
    playbutton.setAttribute("type","button");
    
    let goHomeButton=document.createElement("button");
    goHomeButton.setAttribute("class","goHomeButton");
    goHomeButton.setAttribute("id","highScores");
    goHomeButton.innerText="Go Home";
    goHomeButton.setAttribute("onclick","getindexpage()")
    goHomeButton.setAttribute("type","button");

    scoredisplay.append(scorediv,inputusernamediv,br1,savebuttondiv,playbutton,goHomeButton);
    body.append(scoredisplay);
}

