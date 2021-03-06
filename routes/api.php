<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Login
Route::post('login', 'LoginController@login');

//Logout
Route::post('logout', 'LoginController@logout');

//Check Logged
Route::post('me', 'LoginController@me');

//Get All the Posts
Route::get('posts', 'PostController@index');

//Get a specific Post by ID
Route::get('posts/{id}','PostController@show');

Route::group(['middleware' => ['logged']], function (){
    //Delete a Post
    Route::delete('posts/{id}', 'PostController@destroy');
    //Update a Post
    Route::put('posts/{id}','PostController@update');
    //Insert a Post
    Route::post('posts','PostController@store');
});


