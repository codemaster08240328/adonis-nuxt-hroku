<script>
if ($('.hero-section').length > 0) {
    if (viewport.is('xs')) {
        $('.map-wrapper').height($(window).height() - 25)
        $('.hero-section').height(
            $('.hero-section .map-wrapper').height() +
                $('.hero-section .search-form').height() +
                $('.hero-section .results').height() +
                40
        )
        $('.has-background').css(
            'min-height',
            $(window).height() - $('#page-header').height() + 'px'
        )
        $('.has-map.has-sidebar.sidebar-grid .results-wrapper').height(
            $('.hero-section').height() - $('.map-wrapper').height()
        )
    } else {
        if ($('body').hasClass('navigation-fixed')) {
            $('.hero-section.full-screen').height(
                $(window).height() - $('#page-header nav').height()
            )
            $('.hero-section .map-wrapper').css('height', '100%')
        } else {
            $('.hero-section.full-screen').height(
                $(window).height() - $('#page-header').height()
            )
            $('.hero-section .map-wrapper').css('height', '100%')
            if ($('.map-wrapper').length > 0) {
                reloadMap()
            }
        }
    }
    if (!viewport.is('xs')) {
        $('.search-form.vertical').css(
            'top',
            $('.hero-section').height() / 2 -
                $('.search-form .wrapper').height() / 2
        )
    }
}
</script>
