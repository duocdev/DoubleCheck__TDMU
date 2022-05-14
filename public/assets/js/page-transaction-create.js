$(function () {
    const e = $(".sticky-element");
    window.Helpers.initCustomOptionCheck(),
        t = Helpers.isNavbarFixed() ? $(".layout-navbar").height() + 7 : 0,
        e.length && e.sticky({
            topSpacing: t,
            zIndex: 9
        });
});


let btncheck = document.getElementById('getProduct');
btncheck.addEventListener('click', async () => {

    let productID = document.getElementById('productID').value;


    fetch(`/admin/transaction-create/getProduct`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            productID
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.status) {
                toastr['success']('lấy thông tin thành công', 'Thông báo');
                document.getElementById('productModel').value = data.product.productModel;
                document.getElementById('productCode').value = data.product.productCode;
                document.getElementById('productBrand').value = data.product.productBrand;
                document.getElementById('productVersion').value = data.product.productVersion;
                document.getElementById('ownerID').value = data.product.ownerID;
                document.getElementById('ownerName').value = data.product.ownerName;
            } else {
                toastr['error'](data.message, 'Thông báo');
            }


        })
}, false);


flatpickr.localize(flatpickr.l10ns.vn);
$('#transactionDate').flatpickr({ dateFormat: "d-m-Y", maxDate: "today", monthSelectorType: "static" });


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
                businessName: {
                    validators: {
                        notEmpty: {
                            message: 'Tên doanh nghiệp không được để trống'
                        },
                        stringLength: {
                            max: 255,
                            message: 'Tên doanh nghiệp không được quá 255 ký tự'
                        }
                    }
                },
                businessAddress: {
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
                businessPhone: {
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
                businessNumber: {
                    validators: {
                        notEmpty: {
                            message: 'Số đăng ký kinh doanh không được để trống'
                        },
                        stringLength: {
                            max: 255,
                            message: 'Số đăng ký kinh doanh không được quá 255 ký tự'
                        }
                    }
                },
                businessAgent: {
                    validators: {
                        notEmpty: {
                            message: 'Tên người đại diện không được để trống'
                        },
                        stringLength: {
                            max: 255,
                            message: 'Tên người đại diện không được quá 255 ký tự'
                        }
                    }
                },
                transactionDate: {
                    validators: {
                        notEmpty: {
                            message: 'Ngày giao dịch không được để trống'
                        },
                    }
                },
                transactionName: {
                    validators: {
                        notEmpty: {
                            message: 'Tên giao dịch không được để trống'
                        },
                        stringLength: {
                            max: 255,
                            message: 'Tên giao dịch không được quá 255 ký tự'
                        }
                    }
                },
                transactionContent: {
                    validators: {
                        notEmpty: {
                            message: 'Nội dung giao dịch không được để trống'
                        }
                    }
                }
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger,
                bootstrap5: new FormValidation.plugins.Bootstrap5({
                    eleValidClass: "",
                    rowSelector: function (field, ele) {
                        switch (field) {
                            case 'transactionName':
                            case 'transactionContent':
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


            fetch('/admin/transaction-create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    transactionName: frmvalidation.transactionName.value,
                    transactionContent: frmvalidation.transactionContent.value,
                    transactionDate: frmvalidation.transactionDate.value,
                    businessAgent: frmvalidation.businessAgent.value,
                    businessNumber: frmvalidation.businessNumber.value,
                    businessPhone: frmvalidation.businessPhone.value,
                    businessAddress: frmvalidation.businessAddress.value,
                    businessName: frmvalidation.businessName.value,
                    productID: frmvalidation.productID.value,
                    ownerID: frmvalidation.ownerID.value,
                    ownerName: frmvalidation.ownerName.value,

                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.status) {

                        toastr['success']('Tạo giao dịch thành công', 'Thông báo');

                    } else {
                        toastr['error'](data.message, 'Thông báo');
                    }
                })

        });

});