window.onload = function(){

    const gameOverBackGround = document.querySelector('.gameOverBackGround')
    const btnReset = document.querySelector('.reset')
    const canvas = document.querySelector('.canvas')
    const ctx = canvas.getContext('2d')
    
    
    let over = false
    let score = 0
    let speed = 1
    let speedX = 0
    let speedY = 0
    let positionX = 15
    let positionY = 10
    let Lpixel = 20
    let Qpixel = 20
    let appleX = Math.floor(Math.random()*Lpixel)
    let appleY = Math.floor(Math.random()*Lpixel)
    let trail = []
    let tail = 2

    const game = () => {

        positionX += speedX
        positionY += speedY

        ctx.fillStyle = '#121212'
        ctx.fillRect(0,0, canvas.width, canvas.height)
        
        ctx.fillStyle = '#D92525'
        ctx.fillRect(appleX*Lpixel, appleY*Lpixel, Lpixel,Lpixel)       
    
        const snaKeColor = ctx.createLinearGradient(0,0,canvas.width,canvas.height)
        snaKeColor.addColorStop(0, '#84D904')
        snaKeColor.addColorStop(1, '#6BB3F2')
    
        ctx.fillStyle = snaKeColor
        for(let i = 0; i < trail.length; i++){
            ctx.fillRect(trail[i].x*Lpixel, trail[i].y*Lpixel, Lpixel,Lpixel)
            if(trail[i].x == positionX && trail[i].y == positionY){
                if(tail != 2){ //Evita que o game-over aconteça antes de começar o jogo
                    gameover()                 
                } else{
                    return
                }              
            }
        }

        trail.push({x:positionX,y:positionY})
        while(trail.length > tail){
            trail.shift()
        }

        checkForDeath()

        checkFood()       
    }

    const checkForDeath = () => {

        if(positionX < 0){
            gameover()
        }
        if(positionX > Qpixel -1){
            gameover()
        } if(positionY < 0){
            gameover()
        } if(positionY > Qpixel -1){
            gameover()
        }
    }

    const checkFood = () => {
        if(positionX == appleX && positionY == appleY){
            tail++
            score++
            randomFood()
            attScore()
        }
    }

    const randomFood = () => {
        let apX = Math.floor(Math.random()*Lpixel)
        let apY = Math.floor(Math.random()*Lpixel)     

        newFood(apX, apY)
    }
    
    const newFood = (apX,apY) => {
        for(i = 0; i < trail.length; i++){
            if(trail[i].x == apX && trail[i].y == apY){
                console.log('foodProblem')
                randomFood()
                return
            } else {
                    appleX = apX
                    appleY = apY
                    ctx.fillStyle = '#D92525'
                    ctx.fillRect(appleX*Lpixel, appleY*Lpixel,Lpixel,Lpixel)   
            }         
        }  
    } 

    const attScore = () => {
        const socoreDisplay = document.querySelector('.score')       
        if(score < 10){
            socoreDisplay.innerHTML  = `0${score}`
        } else {
            socoreDisplay.innerHTML =  `${score}`
        }
    }

    const gameover = () => {

        setTimeout(() => {
            over = true
            tail = 0
            gameOverBackGround.style.display = 'flex'
            resetSnake()
            btnReset.addEventListener('click', resetGame)
        },150)
    }

    const resetSnake = () => {
        positionX = 15
        positionY = 10
        speedX = 0
        speedY = 0 
    }
    
    const resetGame = () => {
        gameOverBackGround.style.display = 'none'
        over = false
        appleX = Math.floor(Math.random()* Lpixel)
        appleY = Math.floor(Math.random()* Lpixel)
        score = 0
        tail = 2
        attScore()
    }

    const moveSnake = (event) => {
        if(over === false){
            if(event.keyCode == 37 && speedX != speed){ //left
                speedX = -speed
                speedY = 0
            } if(event.keyCode == 38 && speedY != speed){ //up
                speedX = 0
                speedY = -speed           
            } if (event.keyCode == 39 && speedX != -speed){ //right
                speedX = speed
                speedY = 0 
            } if(event.keyCode == 40 && speedY != -speed){ //down
                speedX = 0
                speedY = speed
            }
        }
    }
    
    setInterval(game,100)
    document.addEventListener('keydown', moveSnake)
}