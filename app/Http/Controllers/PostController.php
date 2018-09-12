<?php

namespace App\Http\Controllers; 

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {   
        try
        {
            $post = Post::get();
            return response()->json([$post]);
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
                'title' => 'required | max:10',
                'description' => 'required', 
            ]);
    
            if($validateData->fails()){
                $errors = $validator->errors();
                \Log::error('Error in PostController - store method - Failed to validate '.$errors);
                return response()->json([], 400);
            }
            
            $post = Post::create($request->all());
            return response()->json([$post], 201);    
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

    public function update(Request $request, Post $post)
    {   
        try
        {
            $validateData = \Validator::make($request->all(),[
                'user_id' => 'required',
                'title' => 'required | max:10',
                'description' => 'required', 
            ]);

            if($validateData->fails()){
                $errors = $validator->errors();
                \Log::error('Error in PostController - store method - Failed to validate'.$errors);
                return response()->json([], 400);
            }

            $post->update($request->all());
            return response()->json([$post], 200);
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
            Post::destroy($id);
            return response()->json([], 204);
        }
        catch(\Exception $e)
        {
            \Log::error('Error in PostController - destroy Method '. $e);
            return response()->json([], 500);
        }
    }

}
