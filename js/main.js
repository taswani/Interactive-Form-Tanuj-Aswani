const jobList = $('#title'); //Creating a variable to access the list of job titles.
const shirtList = $('#design'); //Creating a variable to access the list of shirt designs.
const activityBoxes = $(':checkbox'); //Creating a variable to hold all the checkboxes for activities.
const paymentList = $('#payment'); //Creating a variable to access the list of payments types.
const register = $('button[type="submit"]'); //Creating a variable to allow easy access to the register/submit button.
let workshopCost = []; //Creating an array for easier totaling of the cost of activities the user selects.
let count = 0; //Creating a variable to track how many checkboxes are unchecked so that we can display an error message.
let checkboxCount = 0; //Creating another variable to track how many checkboxes are counted so that we can remove the total if there are none checked.
let errorCount = 0; //Creating another variable to keep track of errors that occur, and when the page is allowed to refresh.

$('#name').focus(); //Helps start the page off with the name box highlighted.
$('#colors-js-puns').hide(); //Hides the colors until the shirt design itself is selected.
$('#other-title').hide(); //Hides the text box for the other option in job roles.


//Function used to store the activity relations.
//This would involve coinciding workshops being disabled when a specific workshop is selected.
function setAttr(activity, flag) {
  if (activity === activityBoxes[1]) {
    $('input:checkbox[name="express"]').attr('disabled', flag);
  } else if (activity === activityBoxes[2]) {
    $('input:checkbox[name="node"]').attr('disabled', flag);
  } else if (activity === activityBoxes[3]) {
    $('input:checkbox[name="js-frameworks"]').attr('disabled', flag);
  } else if (activity === activityBoxes[4]) {
    $('input:checkbox[name="js-libs"]').attr('disabled', flag);
  }
}


//Function used to append the html text associated with the 'Total' that is displayed as activities are selected.
//Also removes the html text in order to not have more than one 'Total' at a time.
function totalCost (totalText) {
  $('.total').remove();
  $('.activities').append(totalText);
}


//Function to store all the costs of each workshop available.
//Uses a regular expression to match the digits at the end of each activity's string and pushes that into an array.
function workshopCostArr () {
  for (let i = 0; i < activityBoxes.length; i++) {
    let workshop = $('label input')[i];
    let cost = workshop.parentNode.innerText.match(/\d+$/g);
    cost = parseInt(cost);
    workshopCost.push(cost);
  }
}


//Function used to make sure the that initial page starts the payment method off at credit card.
//Hides all other payment option descriptions aside from credit card.
function paymentListAdjustment () {
  $('#payment option[value="credit card"]').attr('selected', 'selected');
  $('#payment option[value="select_method"]').attr('disabled', 'disabled');
  $('#credit-card').next().hide();
  $('#credit-card').next().next().hide();
}


//Eventlistener that display and removes the input text box associated with 'other' in the select list.
jobList.change(function () {
  let selected = this.value;
  if (selected === 'other') {
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
});


//Eventlistener used to hide or show the colors according to which shirt designs are selected.
//Starts off by showing all the colors available, and switches the selected option and corresponding colors based on design.
shirtList.change(function () {
  let selected = this.value;
  $('#colors-js-puns').show()
  $('#color option[value="cornflowerblue"]').show();
  $('#color option[value="darkslategrey"]').show();
  $('#color option[value="gold"]').show();
  $('#color option[value="tomato"]').show();
  $('#color option[value="steelblue"]').show();
  $('#color option[value="dimgrey"]').show();
  if (selected === 'js puns') {
    $('#color option[value="tomato"]').hide();
    $('#color option[value="steelblue"]').hide();
    $('#color option[value="dimgrey"]').hide();
    $('#color option[value="tomato"]').removeAttr('selected', 'selected');
    $('#color option[value="cornflowerblue"]').attr('selected', 'selected');
  } else if (selected === 'heart js') {
    $('#color option[value="cornflowerblue"]').hide();
    $('#color option[value="darkslategrey"]').hide();
    $('#color option[value="gold"]').hide();
    $('#color option[value="cornflowerblue"]').removeAttr('selected','selected');
    $('#color option[value="tomato"]').attr('selected', 'selected');
  } else {
    $('#colors-js-puns').hide();
  }
});


//Eventlistener that calls totalCost() and setAttr() in order to disable coinciding workshops as well as produce a total cost for all activities.
activityBoxes.change((e) => {
  const isChecked = e.target.checked;
  let activity = e.target;
  let totalSum = 0;
  for (let i = 0; i < activityBoxes.length; i++) { //loops through all checkboxes and uses index position to match with price.
    if (activityBoxes[i].checked) {
      totalSum += workshopCost[i];
    }
  }
  let totalText = '<h2 class="total">Total: $' + totalSum + '<h2>';
  if (isChecked) {
    totalCost(totalText);
    setAttr(activity, true);
    checkboxCount += 1;
    register.removeAttr('disabled');
  } else {
    setAttr(activity, false);
    totalCost(totalText);
    checkboxCount -= 1;
  }
  if (checkboxCount === 0) {
    $('.total').remove();
  }
});


//Eventlistener that actively changes what is shown when each payment option is selected.
//Hides and shows the associated divs according to which option is selected.
paymentList.change(function () {
  let selected = this.value;
  $('#credit-card').hide();
  $('#credit-card').next().hide();
  $('#credit-card').next().next().hide();
  if (selected === 'credit card') {
    $('#credit-card').show();
  } else if (selected === 'paypal') {
    $('#credit-card').next().show();
  } else if (selected === 'bitcoin') {
    $('#credit-card').next().next().show();
  }
});


//Keyup event that serves to remove the disable on the register button once user begins typing in this field.
$('input#name').keyup(function (e) {
  register.removeAttr('disabled');
});

//Keyup event that serves to remove the disable on the register button once user begins typing in this field.
//Also used to actively check to see if email address is being added with the correct format.
$('input#mail').keyup(function (e) {
  register.removeAttr('disabled');
  if ($('input#mail').val().match(/\w+@\w+\.\S\S\S/g) === null) {
    $('p.error-message').remove();
    $('label[for="mail"]').append('<p class="error-message">Please enter a valid email address.</p>')
  } else {
    $('p.error-message').remove();
  }
});

//Keyup event that serves to remove the disable on the register button once user begins typing in this field.
$('input#cc-num').keyup(function (e) {
  register.removeAttr('disabled');
});

//Keyup event that serves to remove the disable on the register button once user begins typing in this field.
$('input#zip').keyup(function (e) {
  register.removeAttr('disabled');
});

//Keyup event that serves to remove the disable on the register button once user begins typing in this field.
$('input#cvv').keyup(function (e) {
  register.removeAttr('disabled');
});


/**

Eventlistener that is used to submit the form.
If there are any errors in the form, the register button is disabled until the user *attempts* to correct the error.
    *This attempt is shown through typing in the correct fields, and/or selecting a checkbox.*
The register button disables whenever the form is submitted with an error of some sort.
Prevents default event behavior upon first click if there are errors. If not, provides a full refresh!
Any error that exists will have the message displayed using the placeholder in red or an error message around the element.
If the error is meant to display as a placeholder, the input text will be cleared to allow the message to show.
The credit card field has an additional error message that is produced when the credit card is not in between 13-16 digits.

**/
register.click (function (e) {
  if (errorCount === 0) {
    e.preventDefault();
  }
  let nameField = $('input#name').val();
  let emailField = $('input#mail').val();
  let emailFormat = emailField.match(/\w+@\w+\.\S\S\S/g);
  let ccNum = $('input#cc-num').val();
  let ccNumDigits = ccNum.match(/\d{13,16}/g)
  let zip = $('input#zip').val();
  let zipDigits = zip.match(/\b\d{5}\b/g);
  let cvv = $('input#cvv').val();
  let cvvDigits = cvv.match(/\b\d{3}\b/g);
  count = 0;
  errorCount = 0;
  if (nameField === '') {
    register.attr('disabled', true);
    $('input#name').attr('placeholder', 'Please enter a name.');
    errorCount += 1;
  } else {
    $('input#name').removeAttr('placeholder')
  }
  if (emailField === '') {
    register.attr('disabled', true);
    $('input#mail').attr('placeholder', 'Please enter an email address.');
    errorCount += 1;
  } else if (emailFormat === null) {
    $('input#mail').val('');
    register.attr('disabled', true);
    $('input#mail').attr('placeholder', 'Please enter a valid email address.');
    errorCount += 1;
  } else {
    $('input#mail').removeAttr('placeholder');
  }
  for (let i = 0; i < activityBoxes.length; i++) {
    if (activityBoxes[i].checked === false) {
      count += 1;
    }
  }
  if (count === 7) {
    $('.error-message').remove();
    $('.activities').append('<h5 class="error-message">Please select one of the options.</h5>')
    register.attr('disabled', true);
    errorCount += 1;
  } else {
    $('.error-message').remove();
  }
  if ($('#payment').find(':selected').text() === 'Credit Card') {
    if (ccNum === '') {
      register.attr('disabled', true);
      $('input#cc-num').attr('placeholder', 'Please enter a credit card number.');
      errorCount += 1;
    } else if (ccNumDigits === null) {
      $('input#cc-num').val('');
      register.attr('disabled', true);
      $('input#cc-num').attr('placeholder', 'Please enter a number that is between 13 and 16 digits long.')
      errorCount += 1;
    } else {
      $('input#cc-num').removeAttr('placeholder')
    }
    if (zip === '') {
      register.attr('disabled', true);
      $('input#zip').attr('placeholder', 'Please enter a zipcode.');
      errorCount += 1;
    } else if (zipDigits === null) {
      $('input#zip').val('');
      register.attr('disabled', true);
      $('input#zip').attr('placeholder', 'Please enter a valid zipcode.')
      errorCount += 1;
    } else {
      $('input#zip').removeAttr('placeholder');
    }
    if (cvv === '') {
      register.attr('disabled', true);
      $('input#cvv').attr('placeholder', 'Please enter a CVV.');
      errorCount += 1;
    } else if (cvvDigits === null) {
      $('input#cvv').val('');
      register.attr('disabled', true);
      $('input#cvv').attr('placeholder', 'Please enter a valid CVV.');
      errorCount += 1;
    } else {
      $('input#cvv').removeAttr('placeholder');
    }
  }
  if (errorCount === 0) {
    register.unbind('click');
  }
});


//Calling the functions necessary in order for the form to work.
workshopCostArr();
paymentListAdjustment();
