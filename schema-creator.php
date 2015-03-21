
<script src="jquery-1.11.2.min.js"></script>
<input type="text" data="name">

<div class="json-ld">
  <pre class='json'></pre>
</div>
title:
<input class="input" type="text" data-path="title">first name:
<input class="input" type="text" data-path="name.firstName">last name:
<input class="input" type="text" data-path="name.lastName">address:
<select class="input" name="addressType" data-path="address.@type">
    <option></option>
    <option value="postalAddress">Postal</option>
</select>street address:
<input class="input" type="text" data-path="address.streetAddress">
<script>
$(function () {
    var element = {};
    $('.input').keyup(function () {
        $('.input').each(function () {
                var path = $(this).data('path').split('.'),
                    currentData = element;
                //        console.log(currentData);
                for (var i = 0; i < path.length - 1; i++) {
                    if (!currentData[path[i]]) {
                        currentData[path[i]] = {};
                    }
                    console.log(currentData[path[i]]);
                    currentData = currentData[path[i]];
                    //  console.log(currentData);
                }
                currentData[path[path.length - 1]] = ($(this).val().length > 0 ? $(this).val() : null);
                if (currentData[path[path.length - 1]] === null) {
                    delete currentData[path[path.length - 1]];
                }
            $(".json").html(JSON.stringify(element, null, 2));
       });
    });
});
</script>
