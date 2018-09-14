<?php

Route::view('/', 'index');

Route::any('{query}',
    function() { return redirect('/'); })->where ('query', '.*');
//Route::view('/login', 'adminSection');
