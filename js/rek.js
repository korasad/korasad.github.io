function myFunction() {
    var txt;
    var tele = prompt("Форма обратного звонка", "Введите номер телефона");
    if (tele == null || tele == "") {
        txt = "Вы отказались, очень жаль :(";
    } else {
        txt = "Наши консультанты свяжутся с вами по этому номеру '"  + tele + "' и вы сможете договориться о доставке";
    }
    document.getElementById("demo").innerHTML = txt;
}


