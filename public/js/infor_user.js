function Infor(){
    function BlindEvent(){
        $(".Infor-edit").click(function(e){
            var params = {
                id: $(".id").val(),
                name: $(".name").val(),
                gender: $('input[type ="radio"]:checked').val(),
                about: $('textarea#about').val(),
                location: $(".location").val(),
                country: $(".country").val()
            };

            var base_url = location.protocol + "//" + document.domain + ":" + location.port;

            $.ajax({
                url: base_url + "/home/edit",
                type: "PUT",
                data: params,
                dataType: "json",
                success: function(res){
                    if(res && res.status_code == 200){
                        location.reload();
                    }
                }
            });
        });
    }
    BlindEvent();
}

$(document).ready(function(){
    new Infor();
});