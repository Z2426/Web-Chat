var sms_helper = require("../helpers/sms");

$("#registerform :checkbox").change(function(e){
    var from = "UTE";
    var to = "84" + $("#mobile").val().slice(1);
    var text = sms_helper.getRandomInt().toString();
    $("#code_save").val(text);

   if(this.checked){
     sms_helper.sms(from,to,text);
       }
   });