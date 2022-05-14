let datalist = [];

$(document).ready(function () {


    fetch('/api/member/active', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': sessionStorage.getItem('token')
        },
        credentials: 'same-origin'
    })



    $('#member-table').DataTable({
        columns: [
            { data: 'memberId' },
            { data: 'memberName' },
            { data: 'memberPhone' },
            { data: 'memberEmail' },
            { data: 'memberStatus' },
            { data: 'memberAction' },

        ],

        data: [
            { memberId: '123664454', memberName: 'Nguyen Van A', memberGender: 'Nam', memberPhone: '0123456789', memberEmail: 'abc@gmail.com', memberCreatedAt: '2020-01-01', memberStatus: 'Đang hoạt động', memberUsername: 'abc' },
            { memberId: '123664454', memberName: 'Nguyen Van A', memberGender: 'Nam', memberPhone: '0123456789', memberEmail: 'abc@gmail.com', memberCreatedAt: '2020-01-01', memberStatus: 'Bị khóa', memberUsername: 'bvb' },
        ],

        columnDefs: [
            { targets: [0], visible: false, searchable: false },
            {
                targets: [-1], visible: true, searchable: false,
                render: function (data, type, row, meta) {
                    return `<a href="/member/details/${row.memberUsername}?token=${sessionStorage.getItem('token')}" class="btn btn-primary btn-sm">Chi tiết</a>`;
                }

            },
        ]


    });

});
