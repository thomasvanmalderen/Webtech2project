$(document).ready(function() {

    $.getJSON('http://localhost:8080/api/discussions', function (data) {
        var items = [];
          $.each( data, function( key, val ) {
            items.push( "<li><a href='discussion/" + val._id + "'>" + val.topic + "</a></li>" );
          });

          $( "<ul/>", {
            "class": "my-new-list",
            html: items.join( "" )
          }).appendTo( "body" );
    });

    $(function() {
     $('#discussion').on('keyup', function(e){
       if(e.keyCode === 13) {
           var topic = {topic : $('#discussion').val()};
            $.ajax({
                type: "POST",
                data : JSON.stringify(topic),
                url: "api/discussions",
                contentType: "application/json"
            });
       };
     });
    });
    
});