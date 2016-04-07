in file crop.js:
    * line 2 - Insert application-Id, secret-key, version your app.

    * line 76 - Replace 'media' by your image path in the Backendless.
                Replace 'image2.jpg' by your file name.






Put the this script after image in the html file.

    <script>
        $( document ).ready(function() {

            // In the variable 'url' put image url from the Backendless storage.
            // Replace 'imageId' by your image ID attribute  from the html page.

            var url = '';
            $.get(url, function (data) {
                $('imageId').attr('src', data);
            });
        });

    </script>