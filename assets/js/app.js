$(document).ready(function(){
  
  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click' , '.option', trivia.guessChecker);
  
})

var trivia = {
  
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId : '',

  questions: {
    q1: 'How many planets are in our solar system?',
    q2: 'What is the largest planet?',
    q3: 'What is the smallest planet?',
    q4: 'Which planet is closest to earth?',
    q5: "Which planet is fursthest from the earth?",
    q6: 'what colour is mars?',
    q7: "How old is our solar system (in billions)?"
  },
  options: {
    q1: ['Seven', 'Eight', 'Nine', 'Ten'],
    q2: ['Mars', 'Earth', 'Jupiter', 'Saturn'],
    q3: ['Mars', 'Earth', 'Jupiter', 'Mercury'],
    q4: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
    q5: ['Neptune', 'Uranus', 'Jupiter', 'Saturn'],
    q6: ['Green','Orange','Red','Purple'],
    q7: ['4.57', '3.62', '5.64','2.9']
  },
  answers: {
    q1: 'Eight',
    q2: 'Jupiter',
    q3: 'Mercury',
    q4: 'Venus',
    q5: 'Neptune',
    q6: 'Red',
    q7: '4.57'
  },
  
  startGame: function(){
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);
    
    $('#game').show();
    
    $('#results').html('');
    
    $('#timer').text(trivia.timer);
    
    $('#start').hide();

    $('#remaining-time').show();
    
    trivia.nextQuestion();
    
  },
  nextQuestion : function(){
    
    trivia.timer = 10;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);
    
    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);
    
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];
    
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
    
  },

  timerRunning : function(){
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }

    else if(trivia.currentSet === Object.keys(trivia.questions).length){
      
      $('#results')
        .html('<h3>Thank you for playing!</h3>'+
        '<p>Correct: '+ trivia.correct +'</p>'+
        '<p>Incorrect: '+ trivia.incorrect +'</p>'+
        '<p>Unaswered: '+ trivia.unanswered +'</p>'+
        '<p>Please play again!</p>');
      
      $('#game').hide();
      
      $('#start').show();
    }
    
  },

  guessChecker : function() {
    var resultId;
    
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
    
    if($(this).text() === currentAnswer){
      $(this).addClass('btn-success').removeClass('btn-info');
      
      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Correct Answer!</h3>');
    }
    else{
      $(this).addClass('btn-danger').removeClass('btn-info');
      
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
    }
    
  },
  guessResult : function(){
    
    trivia.currentSet++;
    
    $('.option').remove();
    $('#results h3').remove();
    
    trivia.nextQuestion();
     
  }

}