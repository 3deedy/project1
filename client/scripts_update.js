var path = window.location.pathname;
var pieces = path.split('/');
var id = pieces[2];

// $.ajax({
//     method: 'GET',
//     url: '/api/chirps/' + id
// }).then(function(chirp) {
//     $('#chirp-message').val(chirp.message);
// }, function(err) {
//     console.log(err);
// });

$.ajax({
    method: 'GET',
    url: '/api/chirps/' + id
}).then(function(chirp) {
    addChirpDiv(chirp);
}, function(err) {
    console.log(err);
});

function addChirpDiv(chirp) {
    var $chirpDiv = $('<div class="chirp"></div>');
    var $message = $('<p id="message"></p>');
    // var $update = $('<textarea id="chirp-message" cols="50" rows="5"></textarea>')
    var $user = $('<p id="user"></p>');
    var $timestamp = $('<p id="timestamp"></p>');
    var $buttonBlock = $('<div class="button-block"></div>');
    // var $editButton = $('<a class="btn btn-default" href="/single_update.html" id="update">u</a>');
    // $editButton.click(function() {
    //     $.ajax({
    //         method: 'GET'
    //         url: '/api/chirps/' + id
    //     }).then(function()
    //     window.location.pathname = '/chirps/' + id + '/update';
    //     $update.appendTo($chirpDiv);
    // }, function(err){
    //     console.log(err);
    // });
    // var $delButton = $("<button class='btn btn-default' id='delete'>x</button>");
    // $delButton.click(function() {
    //     if (confirm('Are you sure you want to delete this chirp?')) {
    //         $.ajax({
    //             method: 'DELETE',
    //             url: '/api/chirps/' + id
    //         }).then(function() {
    //             window.location.replace('/chirps');
    //         }, function(err) {
    //             console.log(err);
    //         });
    //     }
    // });
    
    $message.text(chirp.message);
    $user.text(chirp.username);
    $timestamp.text(new Date(chirp.time).toLocaleString());

    $buttonBlock.append($editButton);
    $buttonBlock.append($delButton);
    
    $user.appendTo($chirpDiv);
    $message.appendTo($chirpDiv);
    $buttonBlock.appendTo($chirpDiv);
    
    $timestamp.appendTo($chirpDiv);
    

    $chirpDiv.appendTo('#chirp-list');
}

$('#update').click(function() {
    var payload = {
        message: $('#chirp-message').val()
    };
    $.ajax({
        method: 'PUT',
        url: '/api/chirps/' + id,
        contentType: 'application/json',
        data: JSON.stringify(payload)
    }).then(function() {
        window.history.back();
    }, function(err) {
        console.log(err);
    });
$.ajax({
    method: 'GET',
    url: '/api/chirps/' + id
}).then(function(chirp) {
    addChirpDiv(chirp);
}, function(err) {
    console.log(err);
});

});