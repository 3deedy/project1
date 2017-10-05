var $chirpButton = $('#chirp-btn');
var $chirpField = $('#chirp-field');
var $chirpList = $('#chirp-list');
var $userSelector = $('#user-selector');

$chirpField.on('input', function() {
var isEmpty = $chirpField.val().length === 0;
$chirpButton.prop('disabled', isEmpty);
});

$chirpButton.click(postChirp);

function postChirp() {
    var chirp = {
    message: $chirpField.val(),
    userid: $userSelector.val(),
    username: $userSelector
};

$.ajax({
        method: 'POST',
        url: '/api/chirps',
        contentType: 'application/json',
        data: JSON.stringify(chirp)
    }).then(function(success) {
        $chirpField.val('');
        $chirpButton.prop('disabled', true);
        getChirps();
    }, function(err) {
        console.log(err);
    });
}

 function addChirpDiv(chirp) {
    var $chirpDiv = $("<div class='chirp'></div>");
    var $message = $('<p id="message"></h5>');
    var $username = $('<p id="username"></p>');
    var $timestamp = $('<p id="timestamp"></p>');
    var $delButton = $("<button class='btn btn-default' id='delete'>X</button>");
    var $link = $('<a></a>');
    $link.attr('href', '/chirps/' + chirp.id);
    
    $delButton.click(function() {
        deleteChirp(chirp.id);
    });
    
    $message.text(chirp.message);
    $username.text(chirp.username);
    $timestamp.text(new Date(chirp.time).toLocaleString());

    $username.appendTo($chirpDiv);
    // $delButton.appendTo($chirpDiv);
    $message.appendTo($link);
    $link.appendTo($chirpDiv);
    $timestamp.appendTo($chirpDiv);
    

    $chirpDiv.appendTo($chirpList);
    
} 

function getChirps(){
    $.ajax({
        method: 'GET',
        url: '/api/chirps'
    }).then(function(chirps) {
        console.log(chirps);
        $chirpList.empty();
        for (var i = 0; i < chirps.length; i++) {
            addChirpDiv(chirps[i]); // just call addChirpDiv instead of retyping the code above
        }
    }, function(err) {
        console.log(err);
    });
}
getChirps();


function deleteChirp(id) {
    $.ajax({
        method: 'DELETE',
        url: '/api/chirps/' + id
    }).then(function() {
        getChirps();
    }, function(err) {
        console.log(err);
    });
}

function populateUsers() {
    $.ajax({
        method: 'GET',
        url: '/api/users'
    }).then(function(users) {
        for (var i = 0; i < users.length; i++) {
            var $userOption = $('<option value="' + users[i].id + '">' + users[i].name + '</option>');
            $userSelector.append($userOption);
        }
    }, function(err) {
        console.log(err);
    });
}
populateUsers(); //call populate user function