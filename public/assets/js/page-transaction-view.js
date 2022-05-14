$(function () {
    const e = $(".sticky-element");
    window.Helpers.initCustomOptionCheck(),
        t = Helpers.isNavbarFixed() ? $(".layout-navbar").height() + 7 : 0,
        e.length && e.sticky({
            topSpacing: t,
            zIndex: 9
        });
});

