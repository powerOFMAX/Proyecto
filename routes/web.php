<?php


Route::get('{query}',
    function() { return view ('index'); })->where ('query', '.*');
