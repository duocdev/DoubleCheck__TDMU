"use strict";

const formAuthentication = document.querySelector("#formAuthentication");
document.addEventListener("DOMContentLoaded", function (e) {
    {
        formAuthentication &&
            FormValidation.formValidation(formAuthentication, {
                fields: {

                    email: {
                        validators: {
                            notEmpty: {
                                message: "Vui lòng nhập email"
                            },
                            emailAddress: {
                                message: "Vui lòng nhập đúng định dạng email"
                            }
                        }
                    },
                    password: {
                        validators: {
                            notEmpty: {
                                message: "Vui lòng nhập mật khẩu"
                            },
                            stringLength: {
                                min: 8,
                                message: "Mật khẩu phải có ít nhất 8 ký tự"
                            }
                        }
                    },
                    username: {
                        validators: {
                            notEmpty: {
                                message: "Vui lòng nhập tên tài khoản"
                            },
                            stringLength: {
                                min: 5,
                                message: "Tên tài khoản phải có ít nhất 5 ký tự"
                            },
                            regexp: {
                                regexp: /^[a-zA-Z0-9_]+$/,
                                message: "Tên tài khoản không được chứa ký tự đặc biệt"
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    bootstrap5: new FormValidation.plugins.Bootstrap5({
                        eleValidClass: "",
                        rowSelector: ".mb-3"
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

                fetch('/admin/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: formAuthentication.username.value,
                        password: formAuthentication.password.value
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data.status) {
                            
                            toastr['success']('Đăng nhập thành công', 'Thông báo');

                            setTimeout(() => {
                                window.location.href = '/admin/dashboard';
                            }, 1000);

                        } else {
                            toastr['error'](data.message, 'Thông báo');
                        }
                    })

            });

    }
});

