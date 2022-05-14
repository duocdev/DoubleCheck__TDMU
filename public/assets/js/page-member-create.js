let frmVal = document.querySelector('#needs-validation');

document.addEventListener('DOMContentLoaded', function () {
    frmVal &&
        FormValidation.formValidation(frmVal, {
            fields: {
                memberId: {
                    validators: {
                        notEmpty: {
                            message: 'Vui lòng nhập số CCCD/CMND/Hộ chiếu'
                        },
                        stringLength: {
                            min: 8,
                            message: 'Số CCCD/CMND/Hộ chiếu phải có ít nhất 8 ký tự'
                        },
                        // remote: {
                        //     url: '/member/check-member-id',
                        //     message: 'Số CCCD/CMND/Hộ chiếu đã tồn tại',
                        //     data: { memberId: frmVal.memberId.value }
                        // },
                    }
                },
                memberEmail: {
                    validators: {
                        notEmpty: {
                            message: 'Vui lòng nhập email'
                        },
                        emailAddress: {
                            message: 'Email không đúng định dạng'
                        },
                        // remote: {
                        //     url: '/api/member/check-email',
                        //     message: 'Email đã tồn tại',
                        //     data: { memberEmail: frmVal.memberEmail.value }
                        // },
                    }
                },
                memberUsername: {
                    validators: {
                        notEmpty: {
                            message: 'Vui lòng nhập tên đăng nhập'
                        },
                        stringLength: {
                            min: 5,
                            max: 20,
                            message: 'Tên đăng nhập phải có ít nhất 5 ký tự và tối đa 20 ký tự'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_]+$/,
                            message: 'Tên đăng nhập không được chứa ký tự đặc biệt'
                        },
                        // remote: {
                        //     url: '/api/member/check-username',
                        //     message: 'Tên đăng nhập đã tồn tại',
                        //     data: { memberUsername: frmVal.memberUsername.value }
                        // },
                    }
                },
                memberName: {
                    validators: {
                        notEmpty: {
                            message: 'Vui lòng nhập tên thành viên'
                        },
                        stringLength: {
                            max: 255,
                            message: 'Tên thành viên không được quá 255 ký tự'
                        },
                    }
                },
                memberGender: {
                    validators: {
                        notEmpty: {
                            message: 'Vui lòng chọn giới tính'
                        },

                    }
                },
                memberBirthYear: {
                    validators: {
                        notEmpty: {
                            message: "Vui lòng nhập năm sinh"
                        },
                        digits: {
                            message: "Vui lòng nhập số."
                        },
                        stringLength: {
                            min: 4,
                            message: "Năm sinh phải có ít nhất 4 số."
                        },
                        lessThan: {
                            max: new Date().getFullYear() - 18,
                            message: "Bạn phải đủ 18 tuổi."
                        },
                    }
                },
                memberPhone: {
                    validators: {
                        notEmpty: {
                            message: 'Vui lòng nhập số điện thoại'
                        },
                        stringLength: {
                            min: 10,
                            max: 11,
                            message: 'Số điện thoại phải có 10 hoặc 11 số'
                        },
                        regexp: {
                            regexp: /^[0-9]+$/,
                            message: 'Số điện thoại là số'
                        },
                    }
                },
                memberAddress: {
                    validators: {
                        notEmpty: {
                            message: 'Vui lòng nhập địa chỉ'
                        },
                        stringLength: {
                            max: 255,
                            message: 'Địa chỉ không được quá 255 ký tự'
                        },
                    }
                },
                memberPassword: {
                    validators: {
                        notEmpty: {
                            message: 'Vui lòng nhập mật khẩu'
                        },
                        stringLength: {
                            min: 8,
                            max: 32,
                            message: 'Mật khẩu phải có ít nhất 8 ký tự và tối đa 32 ký tự'
                        },
                        regexp: {
                            regexp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/,
                            message: 'Mật khẩu phải có ít nhất 1 ký tự in hoa, 1 ký tự in thường, 1 ký tự số và 1 ký tự đặc biệt'
                        },
                    }
                },
                memberConfirmPassword: {
                    validators: {
                        notEmpty: {
                            message: 'Vui lòng nhập lại mật khẩu'
                        },
                        identical: {
                            compare: function () {
                                return frmVal.memberPassword.value;
                            },
                            message: 'Mật khẩu không khớp'
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
            },
            init: e => {
                e.on("plugins.message.placed", function (e) {
                    e.element.parentElement.classList.contains("input-group") && e.element.parentElement.insertAdjacentElement("afterend", e.messageElement)
                })
            }
        }).on('core.form.valid', function () {

            alert('Đăng ký thành công');

        });


})