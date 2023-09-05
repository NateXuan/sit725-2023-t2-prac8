const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">' +
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.path + '">' +
            '</div><div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p><a href="https://en.wikipedia.org/wiki/Cat">' + item.subTitle + '</a></p></div>' +
            '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + item.title + '<i class="material-icons right">close</i></span>' +
            '<p class="card-text">' + item.description + '</p>' + '<button class="delete-button btn waves-effect waves-light" data-id="' + item._id + '">Delete</button>'
        '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}

const submitForm = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.subTitle = $('#subTitle').val();
    formData.path = $('#path').val();
    formData.description = $('#description').val();
    console.log("Form Data Submitted: ", formData);
    postCat(formData);
}

function postCat(cat) {
    $.ajax({
        url: '/api/cat',
        type: 'POST',
        data: cat,
        success: (result) => {
            if (result.statusCode === 200) {
                alert('cat added');
                getAllCats();
            }
        }
    })
}

function getAllCats() {
    $("#card-section").empty();
    $.get('/api/cats', (result) => {
        if (result.statusCode === 200) {
            addCards(result.data);
        }
    })
}

$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        submitForm();
    })
    $('.modal').modal();
    getAllCats();
});

$(document).on('click', '.delete-button', function () {
    let id = $(this).data('id');
    deleteCat(id);
});


function deleteCat(id) {
    $.ajax({
        url: '/api/cat/' + id,
        type: 'DELETE',
        success: (result) => {
            if (result.statusCode === 200) {
                alert('cat deleted');
                getAllCats();
            }
        }
    })
}

var socket = io.connect('http://localhost:3000');

socket.on('number', function(data){
    console.log("Received number: " + data);
});
