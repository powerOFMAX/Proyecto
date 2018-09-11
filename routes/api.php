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

//Get All the Posts
Route::get('posts', 'PostController@index');

//Get a specific Post by ID
Route::get('posts/{post}','PostController@show');

//Delete a Post
Route::delete('posts/{post}', 'PostController@destroy');

//Update a Post
Route::put('posts/{post}','PostController@update');

//Insert a Post
Route::post('posts','PostController@store');

