flatpickr.localize(flatpickr.l10ns.vn);
let flatpickrDate = document.querySelectorAll(".flatpickr-date");
flatpickrDate.forEach(function (e) {
    e.flatpickr({ dateFormat: "d-m-Y", maxDate: "today", monthSelectorType: "static" });
})