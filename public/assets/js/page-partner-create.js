let frmvalidation = document.querySelector('#needs-validation');

document.addEventListener("DOMContentLoaded", function (e) {
    {
        frmvalidation &&
            FormValidation.formValidation(frmvalidation, {
                fields: {
                    businessCode: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập mã doanh nghiệp'
                            },
                            stringLength: {
                                min: 6,
                                max: 6,
                                message: 'Mã doanh nghiệp phải có 6 ký tự'
                            },
                            regexp: {
                                regexp: /^[a-zA-Z0-9]+$/,
                                message: 'Mã doanh nghiệp không được chứa ký tự đặc biệt'
                            },

                            // remote: {
                            //     url: '/api/partner/check-business-code',
                            //     message: 'Mã doanh nghiệp đã tồn tại'
                            // },
                        }
                    },
                    businessName: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập tên doanh nghiệp'
                            },
                            stringLength: {
                                max: 100,
                                message: 'Tên doanh nghiệp không được quá 100 ký tự'
                            },
                        }
                    },
                    businessAddress: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập địa chỉ doanh nghiệp'
                            },
                            stringLength: {
                                max: 255,
                                message: 'Địa chỉ doanh nghiệp không được quá 255 ký tự'
                            },
                        }
                    },
                    businessPhone: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập số điện thoại doanh nghiệp'
                            },
                            stringLength: {
                                min: 10,
                                max: 11,
                                message: 'Số điện thoại phải có từ 10 đến 11 ký tự'
                            },
                            digitis: {
                                message: 'Số điện thoại phải là số'
                            },
                        }
                    },
                    businessEmail: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập email doanh nghiệp'
                            },
                            emailAddress: {
                                message: 'Email doanh nghiệp không đúng định dạng'
                            },
                            // remote: {
                            //     url: '/api/partner/check-business-email',
                            //     message: 'Email doanh nghiệp đã tồn tại'
                            // },
                        }
                    },
                    businessRepresentative: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập tên người đại diện doanh nghiệp'
                            },
                        }
                    },
                    businessRegistrationDate: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập ngày đăng ký doanh nghiệp'
                            },
                            date: {
                                format: 'DD-MM-YYYY',
                                message: 'Ngày đăng ký doanh nghiệp không đúng định dạng'
                            },
                        }
                    },
                    businessField: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập lĩnh vực hoạt động doanh nghiệp'
                            },

                        }
                    },
                    businessUsername: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập tên tài khoản doanh nghiệp'
                            },
                            stringLength: {
                                min: 5,
                                max: 20,
                                message: 'Tên tài khoản doanh nghiệp phải có từ 6 đến 20 ký tự'
                            },
                        }
                    },
                    businessPassword: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập mật khẩu doanh nghiệp'
                            },
                            stringLength: {
                                min: 8,
                                max: 32,
                                message: 'Mật khẩu doanh nghiệp phải có từ 8 đến 32 ký tự'
                            },
                            regexp: {
                                regexp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}/,
                                message: 'Mật khẩu doanh nghiệp phải có ít nhất 1 ký tự in hoa, 1 ký tự in thường, 1 ký tự số và 1 ký tự đặc biệt'
                            },
                        }
                    },
                    businessConfirmPassword: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập lại mật khẩu doanh nghiệp'
                            },
                            stringLength: {
                                min: 8,
                                max: 32,
                                message: 'Mật khẩu doanh nghiệp phải có từ 8 đến 32 ký tự'
                            },
                            identical: {
                                field: 'businessPassword',
                                message: 'Mật khẩu doanh nghiệp không khớp'
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
                                case 'businessAddress':
                                case 'onwerAddress':
                                    return '.col-md-12';

                                default:
                                    return '.col-md-6';
                            }
                        }
                    }),
                    submitButton: new FormValidation.plugins.SubmitButton,
                    // defaultSubmit: new FormValidation.plugins.DefaultSubmit,
                    autoFocus: new FormValidation.plugins.AutoFocus
                }
                ,
                init: e => {
                    e.on("plugins.message.placed", function (e) {
                        e.element.parentElement.classList.contains("input-group") && e.element.parentElement.insertAdjacentElement("afterend", e.messageElement)
                    })
                }
            }).on('core.form.valid', function () {



            });

    }
});



new Tagify(document.querySelector('.tagify'));