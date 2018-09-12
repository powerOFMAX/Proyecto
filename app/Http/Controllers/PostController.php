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
            //$post = Post::select(['id','title','description'])->get();
            $post = Post::get();
            return response()->json([$post]);
        }
        catch(\Exception $e)
        {
            \Log::error('Error in PostController - index Method '.$e);
            $clean = [];
            return response()->json([$clean, 500]);
        }
    }

    public function store(Request $request)
    {
        try
        {
            //$this->validate($request, [
            //    'user_id' => 'required',
            //    'title' => 'required | max:255',
            //    'description' => 'required', 
            //]);
            $validateData = \Validator::make($request->all(),[
                'user_id' => 'required',
                'title' => 'required | max:10',
                'description' => 'required', 
            ])->validate();
    
            $post = Post::create($request->all());
            return response()->json($post, 201);    
        }
        catch(\Exception $e)
        {
            \Log::error('Error in PostController - store method '.$e);
            return response()->json([null, 400]);
        }
    }

    //public function show(Post $post)
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
            $clean = [];
            return response()->json([$clean, 500]);
        }
    }

    public function update(Request $request, Post $post)
    {   
        try
        {
            //$this->validate($request, [
            //    'user_id' => 'required',
            //    'title' => 'required | max:255',
            //    'description' => 'required', 
            //]);
            $validateData = \Validator::make($request->all(),[
                'user_id' => 'required',
                'title' => 'required | max:10',
                'description' => 'required', 
            ])->validate();
    
            $post->update($request->all());
            return response()->json($post, 200);
        }
        catch(\Exception $e)
        {
            \Log::error('Error in PostController - update Method '.$e);
            return response()->json([null, 400]);
        }
    }

    //public function destroy(Post $post)
    public function destroy($id)
    {
        try
        {
            Post::destroy($id);
            return response()->json(null, 204);
        }
        catch(\Exception $e)
        {
            \Log::error('Error in PostController - destroy Method '. $e);
            return response()->json([null, 500]);
        }
    }

}
