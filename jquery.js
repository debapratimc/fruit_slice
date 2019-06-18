//slice fruit
    //play sound and explode fruit
    //increase score by 1

var playing = false;
var score = 0;
var hearts;
var step;
var action;
var fruits = ['apple','banana','cherries','grapes','mango','orange','peach','pear','watermelon'];


//click on start-reset
$(document).ready(function(){
    
    $("#startreset").click(function(){
         
        //playing - reload
        if(playing){
            location.reload();
        }        
        else{
            playing=true;
            score = 0;
            $("#scoreVal").html(score);
            
            $("#lives").show();
            hearts=3;
            
            //show "lives"
            addhearts();
            
            //change button text to reset game
            $("#startreset").html("Reset Game");
            
            //hide game over
            $("#gameover").hide();
            
            //start game
            startGame();
        }
    });
    
    function addhearts(){
        $("#hearts").empty();
        for(i=0; i<hearts; i++){
            $("#hearts").append('<img class="heartImage"  src="images/LogoMakr_7iifJT.png">');
        }
    }
    
    $("#fruits1").mouseover(function(){
        //inc score
        score++;
        $("#scoreVal").html(score);
        
        //sound - DO NOT USE JQUERY selector - the audio will be taken as array
        document.getElementById("sliceSound").play();
        
        //fruit stop
        clearInterval(action);
        
        //hide by animation
        $("#fruits1").hide("explode",400);  //needjquery ui
        
        //new fruits
        setTimeout(startGame,400); //allow hide to complete
    });

    function startGame(){        

        $("#fruits1").show();

        //1.create a random fruit
        chooseFruit();

        $("#fruits1").css({
            left: Math.floor(510*Math.random()),
            top: -50,
        });

        //define a random step - every new fruit will have a different speed
        step = 2 +Math.floor(5*Math.random());

        //2.move fruit down 1 step - every 10ms
        action = setInterval(function(){
            $("#fruits1").css('top',$("#fruits1").position().top + step);

            //if too low?
            if($("#fruits1").position().top > $("#fruitContainer").height()){

                //hearts left?
                if(hearts > 1){
                    $("#fruits1").show();
                    chooseFruit();
                    $("#fruits1").css({
                        left: Math.floor(510*Math.random()),
                        top: -50,
                    });

                    step = 2 +Math.floor(5*Math.random());

                    //reduce heart
                    hearts--;
                    addhearts();

                }

                //game - over
                else{
                    playing=false;

                    //reset to start again
                    $("#startreset").html("Start Game");

                    //show Game over
                    $("#gameover").show();
                    $("#gameover").html("<p>Game Over! </p><p> Your score is "+score+"</p>");

                    //hide lives
                    $("#lives").hide();

                    //stop the process
                    stopAction();
                }
            }
        },10);
    }

    function chooseFruit(){                                                                                                       $("#fruits1").attr('src','images/'+fruits[Math.floor(9*Math.random())]+'.png');
    }

    function stopAction(){
        clearInterval(action);
        $("#fruits1").hide();
    }
});