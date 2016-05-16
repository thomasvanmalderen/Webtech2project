$(document).ready(function() {
    
    var id = $('#id').val();    
    
    $.getJSON('http://localhost:8080/api/questions', function (data) {
            var items = [];
              $.each( data, function( key, val ) {
                var q_id = JSON.stringify(val.topic._id);
                var d_id = '"' + id + '"';
                  if (q_id == d_id) {
                items.push( "<li><p>Vraag: " + val.question + "</p></li>" );
              };
          });

          $( "<ul/>", {
            "class": "question-list",
            html: items.join( "" )
          }).appendTo( "body" );
    });
    
    $.getJSON('http://localhost:8080/api/answers', function (data) {
            var items = [];
              $.each( data, function( key, val ) {
                //var q_id = JSON.stringify(val.question._id);
                //var d_id = '"' + id + '"';
                  //if (q_id == d_id) {
                items.push( "<li><p>Antwoord: " + val.answer + "</p></li>" );
              //};
          });

          $( "<ul/>", {
            "class": "question-list",
            html: items.join( "" )
          }).appendTo( "body" );
        
        console.log(data)
    });
    
    
     $('#btnQuestion').click(function(e){
         if($('#question').val() == '') {
               var question = {question : $('#question').val(), topic: id};
                $.ajax({
                    type: "POST",
                    data : JSON.stringify(question),
                    url: "/api/questions",
                    contentType: "application/json"
                });
         location.reload();
     };
    });
    
});