// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });
  
  
  
  $(document).on("click", "p", function() {
    $("#notes").empty();
  const thisId = $(this).attr("data-id");
  
    // AJAX call
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      //Note Info
      .then(function(data) {
        console.log(data);
        
    
        $("#notes").append("<h2>" + data.title + "</h2>");
       
        $("#notes").append("<input id='titleinput' name='title' >");
        
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        
        if (data.note) {
          
          $("#titleinput").val(data.note.title);
          
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    const thisId = $(this).attr("data-id");
  
    // Run a POST request 
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
      }
    })
     
      .then(function(data) {
       console.log(data);
        $("#notes").empty();
      });
  
    //Remove Values
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });