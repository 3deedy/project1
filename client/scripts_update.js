var path = window.location.pathname;
var pieces = path.split('/');
var id = pieces[2];


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
    var $user = $('<p id="user"></p>');
    var $timestamp = $('<p id="timestamp"></p>');
    var $buttonBlock = $('<div class="button-block"></div>');
    
    $('#update-change-button').click(function() {
        var payload = {
        message: $('#chirp-update').val()
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
    });
    var $delButton = $("<button class='btn btn-default' id='delete'>x</button>");
    $delButton.click(function() {
        if (confirm('Click OK to confirm delete.')) {
            $.ajax({
                method: 'DELETE',
                url: '/api/chirps/' + id
            }).then(function() {
                window.location.replace('/chirps');
            }, function(err) {
                console.log(err);
            });
        }
    });
    
    $message.text(chirp.message);
    $user.text(chirp.username);
    $timestamp.text(new Date(chirp.time).toLocaleString());
    
    $user.appendTo($chirpDiv);
    $delButton.appendTo($chirpDiv);
    $message.appendTo($chirpDiv);
    $timestamp.appendTo($chirpDiv);
    
    $chirpDiv.appendTo('#chirp-list');
}
