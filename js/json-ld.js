$(function() {
  //function to populate the form selector based
  //on the forms that are available.

  $('form').each(function() {
    if ($(this).attr('id') != 'selector') {
      var option = $(this).attr('id');
      $('select#form-selector').append('<option value="' + option + '">' + option.toUpperCase() + '</option>');
    };
  });
  $('option').each(function() {
    console.log($(this).html());
    if (!$(this).html() || $(this).html() === "") {
      $(this).html($(this).val());
    }
  });
  var selected;
  var old;

  //changes the displayed form based on the selection
  $("#selector").change(function() {
    old = selected;
    selected = "#" + $("#selector option:selected").val();
    if (old) {//closes the old form
      $(old).slideToggle();
    }
    $(selected).slideToggle();
    $("pre").html("");
    // clears out the <pre> container for the next one
    //cycles through the elements of the form and
    //clears the value on change.
    $('input,textarea').each(function() {
      if ($(this).attr('type') != 'hidden') {
        $(this).val("");
      };
    });
    var element = {};
    //instantiate the object

    // fire when a key is pressed in an input or textarea
    $(selected + ' input,' + selected + ' textarea,' + selected + ' select').keyup(function() {
      // this iterates through the whole form.  @TODO see if there's a better way
      element = {};
      // this is highly inefficient, but it keeps things in order
      $(selected + ' input,' + selected + ' textarea,' + selected + ' select').each(function() {
        //selects the data-path attr and splits it if necessary.
        //the first is checked to see if it's alreay the key
        //and the second is used as the inner array
        var path = $(this).data('path').split('.'),
            currentData =
            element;
        for (var i = 0; i < path.length - 1; i++) {
          if (!currentData[path[i]]) {
            //if the first part of data-path doesn't exist then it becomes
            //the key for this array
            currentData[path[i]] = {};
          }
          //console.log(currentData[path[i]]);
          currentData = currentData[path[i]];
        }
        //if it's empty, then it doesn't exist
        currentData[path[path.length - 1]] = ($(this).val().length > 0 ? $(this).val() : null);
        if (currentData[path[path.length - 1]] === null) {
          //get rid of the data that doesn't exist
          delete currentData[path[path.length - 1]];
        }
        //prep it for output
        $(".json").val(JSON.stringify(element, null, 2));
      });
    });
  });

  //this function clears the <pre> and all fields
  $("#reset").click(function() {
    $("pre").html("");
    $('input,textarea,select').each(function() {
      if ($(this).attr('type') != 'hidden') {
        $(this).val("");
      }
    });
  });
});
