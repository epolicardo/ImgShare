$('#post-comment').hide();
$('#post-image').hide();

$('#btn-toggle-upload').click(e=>{
    e.preventDefault();
    $('#post-image').slideToggle();
})
$('#btn-toggle-comment').click(e=>{
    e.preventDefault();
    $('#post-comment').slideToggle();
})

$('#btn-like').click(function (e) {
    e.preventDefault();
    let imgId = $(this).data('id');
    //console.log(imgId);

    $.post('/images/' + imgId + '/like')
        .done(data => {
            console.log(data);
            $('.likes-count').text(data.likes);
        });
});


$('#btn-delete').click(function (e) {
    e.preventDefault();
    let $this = $(this);
    const resp = confirm('Are you sure to delete this image?');

    if (resp) {
        let imgId = $this.data('id');
        $.ajax({
            url: "/images/" + imgId,
            type: 'DELETE',
        }).done(function(result){
            $this.removeClass('btn-danger').addClass('btn-success');
            $this.find('i').removeClass('fa-times').addClass('fa-check');
            $this.append('<span>Deleted</span>')
            
            console.log(result);
        });

    }
});