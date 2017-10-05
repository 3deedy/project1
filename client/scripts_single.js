var path = window.location.pathname; // /chirps/12
var pieces = path.split('/'); // ['', 'chirps', '12']
var id = pieces[2]; // 12

$.ajax({
    method: 'GET',
    url: '/api/chirps/' + id
}).then(function(chirp) {
    console.log(chirp);
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
    var $buttonBlock = $('<div class="input-group" id="button-block"></div>');
    var $editButton = $('<a class="btn btn-default" id="update-button">u</a>');
    $editButton.attr('href', '/chirps/' + chirp.id + '/update');
    // $editButton.click(function(chirp) {
        // instead of window.pathname.location...
    //     });
    
    var $delButton = $("<button class='btn btn-default' id='delete'>x</button>");
    $delButton.click(function() {
        if (confirm('Click OK to confirm delete')) {
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

    $buttonBlock.append($editButton);
    $buttonBlock.append($delButton);
    
    $user.appendTo($chirpDiv);
    $message.appendTo($chirpDiv);
    $buttonBlock.appendTo($chirpDiv);
    
    $timestamp.appendTo($chirpDiv);
    

    $chirpDiv.appendTo('#chirp-list');
};