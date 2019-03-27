//<==========================================================
//DnDFileController sets up the correct DnD event listeners on the element you pass in as the selector.
function DnDFileController(selector, onDropCallback) {
  var el_ = document.querySelector(selector);

  this.dragenter = function(e) {
    e.stopPropagation();
    e.preventDefault();
    el_.classList.add('dropping');
  };

  this.dragover = function(e) {
    e.stopPropagation();
    e.preventDefault();
  };

  this.dragleave = function(e) {
    e.stopPropagation();
    e.preventDefault();
    //el_.classList.remove('dropping');
  };

  this.drop = function(e) {
    e.stopPropagation();
    e.preventDefault();

    el_.classList.remove('dropping');

    onDropCallback(e.dataTransfer.files, e);
  };

  el_.addEventListener('dragenter', this.dragenter, false);
  el_.addEventListener('dragover', this.dragover, false);
  el_.addEventListener('dragleave', this.dragleave, false);
  el_.addEventListener('drop', this.drop, false);
};
//===============================================================>

var dnd = new DnDFileController('body', function(files) {  
    var f = files[0];

    if (!f.type.match('application/json')) {
        // alert('Not a JSON file!');
        document.getElementById('user_input').value="Not a JSON file!";
    } else {
        var reader = new FileReader();
        reader.readAsText(f, "UTF-8");
        reader.onloadend = function(e) {
            try {
                // var result = JSON.parse(this.result);
                // result = JSON.stringify(result)
                result = e.target.result;
            }
            catch(err) {
                // result = JSON.stringify(this.result)
                // var result = err.message;
                result = "error reading file";
            }

            // var result = JSON.parse(this.result);
            // console.log(result);
            document.getElementById('user_input').value = result ;
        };
        reader.readAsText(f);
    }   
});


// Beautify
$(document).ready(function() {
    $("#beautify-generate").click(function(e) { e.preventDefault()
        $.ajax({
            type: 'POST',
            url:'http://127.0.0.1:8000/',
            data:{
                    json_input: document.getElementById('user_input').value
                // csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
            },
            success: function (result){
                // alert(result);
                result = result
                document.getElementById('user_input').value=result
            }
        })
    });
});


// Minify
$(document).ready(function() {
    $("#minify-generate").click(function(e) { e.preventDefault()
        $.ajax({
            type: 'POST',
            url:'http://127.0.0.1:8000/minify/',
            data:{
                    json_input: document.getElementById('user_input').value
                // csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
            },
            success: function (result){
                // alert(result);
                result = result
                document.getElementById('user_input').value=result
            }
        })
    });
});

// Minify
function clearContents(element) {
  element.value = '';
}