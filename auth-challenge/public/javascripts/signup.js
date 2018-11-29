console.log("WE MADE IT");

function signupViaAjax() {
    fetch("/sign-up")
      .then(function(data) {
        // Here you get the data to modify as you please
      })
      .catch(function(error) {
        // If there is any error you will catch them here
      });
  }