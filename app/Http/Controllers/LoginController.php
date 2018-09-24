<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class LoginController extends Controller
{

public function me(){
        try
        {
            //preguntar en if y retornar (t o f)
            return Auth::check();
        }
        catch(\Exception $e){
  
        }
    }

   public function logout(){
        try
        {   
            Auth::logout();
        }
        catch(\Exception $e){
 
        }
   }

    public function login(Request $request)
    {
        try
        {  
            $email = $request->email;
            $password= $request->password;
            
            $validateData = \Validator::make($request->all(),[
                'email' => 'required | exists:users,email',
                'password' => 'required | max:255', 
                ]);

                
                if($validateData->fails()){
                    $errors = $validateData->errors();
                    return response()->json([ 'message' => $errors->first()], 400);
                }
                
                
                $user = User::
                where([
                    'email' => $email
                    ])->first();
                    if ( Hash::check($password ,$user->password) ) {
                        Auth::login($user);
                        return response()->json($user);            
                    }

                    
                return response()->json([],400);
        }
        catch(\Exception $e)
        {
            \Log::error('Error in UserController - login Method '.$e);
            return response()->json(null, 500);
        }
    }
}
