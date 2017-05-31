(function ($) {
    $('.fix-it').fixScroll({
        offset: 20,
        className: 'fixed right',
        onInit: function (el) {
            //alert('Init processed.');
        },
        onScroll: function (el) {
            var idName = el.attr('id');
            $('[data-rel-id="'+idName+'"]')[0].innerHTML = Math.ceil(el.offset().top);
        }
    });

    $('.fix-it-2').fixScroll({
        offset: 100,
        className: 'fixed right',
        onInit: function (el) {
            //alert('Init processed.');
        },
        onScroll: function (el) {
            var idName = el.attr('id');
            $('[data-rel-id="'+idName+'"]')[0].innerHTML = Math.ceil(el.offset().top);
            $('#window-scroll')[0].innerHTML = $(window).scrollTop();
        }
    });
}(jQuery));

