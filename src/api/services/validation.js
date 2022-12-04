exports.validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

exports.isValidIngredients = (list) => {
    var result = true;

    list.forEach((element, index, array) => {
            
        if(element.entry == undefined || element.entry == "" || element.entry == null || element.type == undefined || element.type == "" || element.type == null){
            result = false;
        }
    });

    return result;
}

exports.isValidSteps = (list) => {
    var result = true;

    list.forEach((element, index, array) => {
        if((typeof element.step_id) != 'number' || element.step_id == undefined || element.step_id == 0 || element.step_id == null || element.text == undefined || element.text == "" || element.text == null){
            result = false;
        }
    });

    return result;
}