<html>
<head>
<title>Ejemplo Loco</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
</head>
<body>
<div class="undoable">
    <div class="undoredo">
        <a class="undo" href="javascript:void(0)">Undo</a>
        <a class="redo" href="javascript:void(0)">Redo</a>
    </div>
    <div class="forms">
        <form action="." method="post" data-name="form1">
            <h1>Form 1</h1>
            First name: <input type="text" name="firstname"><br>
            Last name: <input type="text" name="lastname"><br>
            Password: <input type="password" name="pwd">
            <input type="radio" name="sex" value="male">Male<br>
            <input type="radio" name="sex" value="female">Female<br>
            <input type="checkbox" name="vehicle" value="Bike">I have a bike<br>
            <input type="checkbox" name="vehicle" value="Car">I have a car <br>
           
            <textarea name="comment" placeholder="write a comment..."></textarea>
        </form>
       
        <form action="." method="post" data-name="form2">
            <h1>Form 2</h1>
           
            First name: <input type="text" name="firstname"><br>
            Last name: <input type="text" name="lastname"><br>
            Password: <input type="password" name="pwd">
            <input type="radio" name="sex" value="male">Male<br>
            <input type="radio" name="sex" value="female">Female<br>
            <input type="checkbox" name="vehicle" value="Bike">I have a bike<br>
            <input type="checkbox" name="vehicle" value="Car">I have a car <br>
           
            <textarea name="comment" placeholder="write a comment..."></textarea>
        </form>
    </div>
</div>
   
<!-- javascript -->
<script src="js/jquery.js"></script>

 
<script>
 
function bool(str) {
    if (str === "true") return true;
    else return false;
}
 
var num_states = 0;
var current_state = 0;
var text_elements = 'input[type="text"], input[type="password"], textarea';
var state_elements = 'input[type="radio"], input[type="checkbox"]';
 
$(document).ready(function() {
   
    // Se guardan los valores iniciales
    $(text_elements, '.undoable form').each(function() {
        var val = $(this).val();
        $(this).attr('data-previous', val);
    });
    $(state_elements, '.undoable form').each(function() {
        var val = $(this).prop('checked');
        $(this).attr('data-previous', val);
    });
   
    // On change se agrega un estado a cada elemento
    $(text_elements + ',' + state_elements, '.undoable form').on('change', function() {
        num_states = current_state;
        num_states++;
        current_state = num_states;
       
        $(text_elements, '.undoable form').each(function() {
            var current_val = $(this).val();
            var prev = $(this).attr('data-previous').split(',').slice(0,num_states);
            prev.push(current_val);
            $(this).attr('data-previous', prev.join(','));
        });
       
        $(state_elements, '.undoable form').each(function() {
            var current_val = $(this).prop('checked');
            var prev = $(this).attr('data-previous').split(',').slice(0,num_states);
            prev.push(current_val);
            $(this).attr('data-previous', prev.join(','));
        });
    });
   
    $('.undo, .redo', '.undoable .undoredo').on('click', function() {
        if ($(this).hasClass('undo')) {
            // undo
            if (current_state == 0) return false;
            current_state--;
        } else {
            // redo
            if (current_state == num_states) return false;
            current_state++;
        }
       
        $(text_elements, '.undoable form').each(function() {
            var prev = $(this).attr('data-previous').split(',');
            $(this).val(prev[current_state]);
        });
        $(state_elements, '.undoable form').each(function() {
            var prev = $(this).attr('data-previous').split(',');
            $(this).prop('checked', bool(prev[current_state]));
        });
       
        return true;
    });
 
   
});
</script>
<!-- /javascript -->
 
</body>
</html>