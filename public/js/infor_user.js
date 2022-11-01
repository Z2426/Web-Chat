function Infor(){
    function BlindEvent(){
        var fileData;
        var myFile;
        $('#image').change(function(){
            var filereader = new FileReader();
            filereader.onload = function(event){
               fileData  = event.target.result;
            };
            myFile = $('#image').prop('files')[0];  
           filereader.readAsDataURL(myFile)
        });

        $(".Infor-edit").click(function(e){
            if(myFile == undefined){
                var params = {
                    id: $(".id").val(),
                    name: $(".name").val(),
                    gender: $('input[type ="radio"]:checked').val(),
                    about: $('textarea#about').val(),
                    location: $(".location").val(),
                    country: $("#country").val(),
                    occupation: $(".occupation").val(),
                    image_name: "",
                };
            }
            else{
            var params = {
                id: $(".id").val(),
                name: $(".name").val(),
                gender: $('input[type ="radio"]:checked').val(),
                about: $('textarea#about').val(),
                location: $(".location").val(),
                country: $("#country").val(),
                occupation: $(".occupation").val(),
                image_name: myFile.name,
                image_data: fileData
            };
        }
            var base_url = location.protocol + "//" + document.domain + ":" + location.port;
           //console.log($(form).serialize());
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