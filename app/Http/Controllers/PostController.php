<?php

namespace App\Http\Controllers; 

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index()
    {   
        try
        {
            $post = Post::all();
            return response()->json($post);
        }
        catch(\Exception $e)
        {
            \Log::error('Error in PostController - index Method '.$e);
            return response()->json([], 500);
        }
    }

    public function store(Request $request)
    {
        try
        {
            $validateData = \Validator::make($request->all(),[
                'user_id' => 'required',
                'title' => 'required | max:255',
                'description' => 'required', 
            ]);
    
            if($validateData->fails()){
                $errors = $validateData->errors();
                return response()->json(['message' => $errors->first()], 400);
            }
            
            $post = Post::create($request->all());
            return response()->json(['post' => $post], 201);    
        }
        catch(\Exception $e)
        {
            \Log::error('Error in PostController - store method '.$e);
            return response()->json([], 500);
        }
    }

    public function show($id)
    {
        try
        {
            $post = Post::findOrFail($id);
            return response()->json([$post]);
        }
        catch(\Exception $e)
        {
            \Log::error('Error in PostController - show Method '.$e);
            return response()->json([], 500);
        }
    }

    public function update(Request $request, $id)
    {   
        try
        {
            $validateData = \Validator::make($request->all(),[
                'user_id' => 'required',
                'title' => 'required | max:255',
                'description' => 'required', 
            ]);

            if($validateData->fails()){
                $errors = $validateData->errors();
                return response()->json([ 'message' => $errors->first()], 400);
            }
            $post=Post::findOrFail($id);
            $post->update($request->all());
            return response()->json(['post' => $post], 200);
        }
        catch(\Exception $e)
        {
            \Log::error('Error in PostController - update Method '.$e);
            return response()->json([], 500);
        }
    }

    public function destroy($id)
    {
        try
        {
        //if (Auth::check()) {
            Post::destroy($id);
            return response()->json([], 204);
        //}
        
        }
        catch(\Exception $e)
        {
            \Log::error('Error in PostController - destroy Method '. $e);
            return response()->json([], 500);
        }
    }

}
