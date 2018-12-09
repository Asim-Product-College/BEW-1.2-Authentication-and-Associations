$(document).ready(function() { //when the page ia ready
    $(".vote-up").submit(function(e) { //when this form is submitted
      e.preventDefault(); //prevent the default, was that tho lol? - seems syntactical
  
      var postId = $(this).data("id"); //grab id
      $.ajax({ //create ajax request
        type: "PUT", //update
        url: "/posts/" + postId + "/vote-up", //this url
        success: function(data) { //if success 
          console.log("voted up!"); //log suc
        },
        error: function(err) { //else log err
          console.log(err.messsage);
        }
      });
    });
  
    $(".vote-down").submit(function(e) { //same as above for downvote
      e.preventDefault();
    
      var postId = $(this).data("id");
      $.ajax({
        type: "PUT",
        url: "/posts/" + postId + "/vote-down",
        success: function(data) {
          console.log("voted down!");
        },
        error: function(err) {
          console.log(err.messsage);
        }
      });
    });
  });