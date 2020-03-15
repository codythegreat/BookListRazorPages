var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#DT_Load').DataTable({
        "ajax": {
            "url": "/api/book",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "width": "30%" },
            { "data": "author", "width": "30%" },
            { "data": "isbn", "width": "30%" },
            {
                "data": "id",
                "render": function (data) {
                    return `
                    <div class="text-center">
                        <a href="/Booklist/Upsert?id=${data}" class="btn btn-success text-white" style="cursor:pointer; width:100px; margin-bottom:5px;">
                            Edit
                        </a>
                        <a class="btn btn-danger text-white" style="cursor:pointer; width:100px;"
                            onclick="fakeDelete()">
                            Delete
                        </a>
                    </div>`
                }, "width": "40%"
            }
        ],
        "language": {
            "emptyTable": "no data found"
        },
        "width": "100%"
    })
}


// Delete('/api/book?id='+${data}) <== use this to delete entries via this function
function Delete(url) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    } else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}

function fakeDelete() {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {

        if (willDelete) {
            toastr.success("You've fake deleted this book");
        } else {
            toastr.error("This book could not be deleted");
        }
    });
}