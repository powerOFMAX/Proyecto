<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
        <title>MyBlog</title>
        
        <meta name="csrf-token" content= {{csrf_token()}}>
    </head>
    <body>
        <div id="app">
        
        <script src="{{mix('js/app.js')}}"></script>    
        </div>
    </body>
</html>
