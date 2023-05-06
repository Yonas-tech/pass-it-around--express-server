// 1. Require modules
const express = require('express');

// 2. instantiate express app
const app = express();

// port
const port = 3000;


// 3. Routs: 

// Home ---> localhost:3000
// Bottles---> localhost:3000/bottles
// Bugs ---> localhost:3000/bugs


app.get('/', (req,res)=>{
    res.send(`
        <h3><a href="/bottles">Take Down Bottles</a></h3>
        <h3><a href="/bugs">Take Down Bugs</a></h3>
    `)
})



// For Bugs Routes:
app.get('/bugs',(req,res)=>{

    res.send(`
            <a href="/">Home</a>
            <h1>99 little bugs in the code</h1>
            <h2>99 little bugs</h2>
            <a href="bugs/98">take one down, pass it around</a>`)
})
app.get('/bugs/:number_of_bugs',(req,res)=>{
    let param_bugs = Number(req.params.number_of_bugs);
    
    // let the bugs go up at a 25% probalbily with a random number between 1 and 20
    let increment = 0;
    let rand = Math.random();
    if(rand<0.25){ 
        increment = Math.floor(Math.random()*20);
    }

    // for bugs > 0 after the first page
    if(param_bugs>0){   
    let newBugsNum = param_bugs + increment;
    res.send(`
            <a href="/">Home</a>
            <h1>${newBugsNum} bugs in the code</h1>
            <a href="/bugs/${newBugsNum-1}">take one down, pass it around</a>`)
    }
    else{ // if bugs == 0  
        res.send(`
            <a href="/">Home</a>
            <h1>${param_bugs} bugs in the code</h1>
            <a href="/bugs">Start Over</a>`)
    }
})


// For Bottles Routes:
app.get('/bottles',(req,res)=>{
    res.send(`
            <a href="/">Home</a>
            <h1>99 Bottles of beer on the wall</h1>
            <a href="/bottles/98">take one down, pass it around</a>`)
})
app.get('/bottles/:number_of_bottles',(req,res)=>{
    if(req.params.number_of_bottles>0){ // show this when there are bottles>0 after the first page
    res.send(`
            <a href="/">Home</a>
            <h1>${req.params.number_of_bottles} Bottles of beer on the wall</h1>
            <a href="/bottles/${req.params.number_of_bottles-1}">take one down, pass it around</a>`)
    }
    else{ // shows this if there are 0 bottles on the wall
        res.send(`
            <a href="/">Home</a>
            <h1>${req.params.number_of_bottles} Bottles of beer on the wall</h1>
            <a href="/bottles">Start Over</a>`)
    }
})

// For 404 error page routes:
app.get('/*',(req,res)=>{
    res.send(`
    <div style="display:flex; flex-direction: column; align-items: center; height: 100hv; box-sizing:border-box;">
    <div style='height: 550px; width: 600px; font-size: 80px; display:flex; justify-content: center;
                background-size: contain;
                background-image: url(https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?w=1060&t=st=1683391255~exp=1683391855~hmac=650713c17d251d80091273de6ee0f083ed7d615e33cecec0093e3b129e80b668)'> 
                </div>

        <h1 style="line-height:20px"> Look like your're lost </h1>
        
        <a href="/">
            <button style="background:green; font-size:20px; box-shadow: 5px 10px #888888; border-radius: 12px;"
                onMouseOver="this.style.color='#0F0'"
                onMouseOut="this.style.color='#00F'"> Go to Home
            </button>
        </a>

    </div>
    `)
})


// Tell the app to listen on port 3000
app.listen(3000, ()=>console.log(`Server is listening on, ${port}`))

