$(function () {
    const e = $(".sticky-element");
    window.Helpers.initCustomOptionCheck(),
        t = Helpers.isNavbarFixed() ? $(".layout-navbar").height() + 7 : 0,
        e.length && e.sticky({
            topSpacing: t,
            zIndex: 9
        });
});

flatpickr.localize(flatpickr.l10ns.vn);
$('#productActiveDate').flatpickr({ dateFormat: "d-m-Y", maxDate: "today", monthSelectorType: "static" });
$('#ownerBuyDate').flatpickr({ dateFormat: "d-m-Y", maxDate: "today", monthSelectorType: "static" });

let frmvalidation = document.querySelector('#needs-validation');

document.addEventListener("DOMContentLoaded", function (e) {
    frmvalidation &&
        FormValidation.formValidation(frmvalidation, {
            fields: {
                productCode: {
                    validators: {
                        notEmpty: {
                            message: 'Mã nhận dạng sản phẩm không được để trống'
                        },
                        stringLength: {
                            max: 50,
                            message: 'Mã nhận dạng sản phẩm không được quá 50 ký tự'
                        },
                    }
                },
                productModel: {
                    validators: {
                        notEmpty: {
                            message: 'Tên sản phẩm không được để trống'
                        },
                        stringLength: {
                            max: 255,
                            message: 'Tên sản phẩm không được quá 255 ký tự'
                        },
                    }
                },
                productActiveDate: {
                    validators: {
                        notEmpty: {
                            message: 'Ngày sản xuất không được để trống'
                        },
                    }
                },
                productBrand: {
                    validators: {
                        notEmpty: {
                            message: 'Thương hiệu không được để trống'
                        },
                        stringLength: {
                            max: 255,
                            message: 'Thương hiệu không được quá 255 ký tự'
                        },
                    }
                },
                productVersion: {
                    validators: {
                        notEmpty: {
                            message: 'Phiên bản không được để trống'
                        },
                        stringLength: {
                            max: 255,
                            message: 'Phiên bản không được quá 255 ký tự'
                        },
                    }
                },
                productYear: {
                    validators: {
                        notEmpty: {
                            message: 'Năm sản xuất không được để trống'
                        },
                        stringLength: {
                            min: 4,
                            max: 4,
                            message: 'Năm sản xuất phải có 4 ký tự'
                        },
                        lessThan: {
                            max: new Date().getFullYear(),
                            message: 'Năm sản xuất không được lớn hơn năm hiện tại'
                        },
                        greaterThan: {
                            min: 1900,
                            message: 'Năm sản xuất không được nhỏ hơn 1900'
                        },
                    }
                },
                ownerID: {
                    validators: {
                        notEmpty: {
                            message: 'Số CCCD/CMND không được để trống'
                        },
                        stringLength: {
                            min: 9,
                            max: 12,
                            message: 'Số CCCD/CMND phải có 9 hoặc 12 ký tự'
                        },
                        digits: {
                            message: 'Số CCCD/CMND phải là số'
                        },
                    }
                },
                ownerName: {
                    validators: {
                        notEmpty: {
                            message: 'Tên không được để trống'
                        },
                        stringLength: {
                            max: 255,
                            message: 'Tên không được quá 255 ký tự'
                        },
                    }
                },
                ownerAddress: {
                    validators: {
                        notEmpty: {
                            message: 'Địa chỉ không được để trống'
                        },
                        stringLength: {
                            max: 255,
                            message: 'Địa chỉ không được quá 255 ký tự'
                        },
                    }
                },
                ownerPhone: {
                    validators: {
                        notEmpty: {
                            message: 'Số điện thoại không được để trống'
                        },
                        stringLength: {
                            min: 10,
                            max: 11,
                            message: 'Số điện thoại phải có 10 hoặc 11 ký tự'
                        },
                        digits: {
                            message: 'Số điện thoại phải là số'
                        },
                    }
                },
                ownerBuyDate: {
                    validators: {
                        notEmpty: {
                            message: 'Ngày mua không được để trống'
                        },
                    }
                },

            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger,
                bootstrap5: new FormValidation.plugins.Bootstrap5({
                    eleValidClass: "",
                    rowSelector: function (field, ele) {
                        switch (field) {
                            case 'ownerAddress':
                                return '.col-md-12';

                            default:
                                return '.col-md-6';
                        }
                    }
                }),
                submitButton: new FormValidation.plugins.SubmitButton,
                // defaultSubmit: new FormValidation.plugins.DefaultSubmit,
                autoFocus: new FormValidation.plugins.AutoFocus
            },
            init: e => {
                e.on("plugins.message.placed", function (e) {
                    e.element.parentElement.classList.contains("input-group") && e.element.parentElement.insertAdjacentElement("afterend", e.messageElement)
                })
            }
        }).on('core.form.valid', function () {

            fetch('/admin/product-registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productCode: frmvalidation.productCode.value,
                    productModel: frmvalidation.productModel.value,
                    productActiveDate: frmvalidation.productActiveDate.value,
                    productBrand: frmvalidation.productBrand.value,
                    productVersion: frmvalidation.productVersion.value,
                    productYear: frmvalidation.productYear.value,
                    ownerID: frmvalidation.ownerID.value,
                    ownerName: frmvalidation.ownerName.value,
                    ownerAddress: frmvalidation.ownerAddress.value,
                    ownerPhone: frmvalidation.ownerPhone.value,
                    ownerBuyDate: frmvalidation.ownerBuyDate.value,
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.status) {
                        let docDefinition = {
                            content: [
                                { qr: window.location.host + "/tra-cuu/" + data.data.productID },
                                { text: 'ID sản phẩm: ' + data.data.productID, margin: [5, 2, 10, 20] },
                                {
                                    text: 'liên kết tra cứu: ' + window.location.host + "/tra-cuu/" + data.data.productID,
                                    link: 'window.location.host + "/tra-cuu/" + data.data.productID',
                                    margin: [5, 2, 10, 20]
                                },
                                { text: 'Chủ sở hữu: ' + frmvalidation.ownerName.value, margin: [5, 2, 10, 20] },
                                { text: 'Số CCCD/CMND: ' + frmvalidation.ownerID.value, margin: [5, 2, 10, 20] },
                                { text: 'Địa chỉ: ' + frmvalidation.ownerAddress.value, margin: [5, 2, 10, 20] },
                                { text: 'Số điện thoại: ' + frmvalidation.ownerPhone.value, margin: [5, 2, 10, 20] },
                                { text: 'Ngày đăng ký: ' + frmvalidation.productActiveDate.value, margin: [5, 2, 10, 20] },
                            ]
                        }

                        toastr['success']('Đăng ký thành công', 'Thông báo');
                        pdfMake.createPdf(docDefinition).download();
                    } else {
                        toastr['error']('Đăng ký thất bại', 'Thông báo');
                    }
                })

        });

});