$(document).ready(function () {
    $('#btnCopy').on('click', function () {
        console.log($('.infoBlockA > input:nth-of-type(1)').val());
        var nameValue = $('.infoBlockA > input:nth-of-type(1)').val();
        var phoneValue = $('.infoBlockA > input:nth-of-type(2)').val();
        $('.infoBlockB > input:nth-of-type(1)').val(nameValue);
        $('.infoBlockB > input:nth-of-type(2)').val(phoneValue);
    })

    $('#orderTotal > a:nth-of-type(2)').on('click', function(){
        $('#deliverAndPayment').css('display', 'block');
        $('#deliverInfo').css('display', 'flex');
        $('#finishOrder').css('display', 'block');
    })
})