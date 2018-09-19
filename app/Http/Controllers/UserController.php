<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($email, $password)
    {
        
    }

    public function login(Request $request)
    {
        try
        {
            $email = $request->email;
            $password= $request->password;

            $validateData = \Validator::make($request->all(),[
                'email' => 'required',
                'password' => 'required | max:2', 
            ]);

            if($validateData->fails()){
                $errors = $validateData->errors();
                return response()->json([ 'message' => $errors->first()], 400);
            }

            $user = User::
                where([
                    'email' => $email,
                    'password' => $password
                ])->first();
                return response()->json($user);            
        }
        catch(\Exception $e)
        {
            \Log::error('Error in UserController - show Method '.$e);
            return response()->json(null, 500);
        }
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
