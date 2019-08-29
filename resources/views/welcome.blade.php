<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
    <meta name="csrf-token" content="{{ csrf_token() }}"/>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- css react -->
        <link rel="stylesheet" href="css/app.css">
    </head>

    <body>
        <div class="content">
            <div id="example"></div>
        </div>
    </body>
    
    <script type="text/javascript" src="js/app.js"></script>
</html>
