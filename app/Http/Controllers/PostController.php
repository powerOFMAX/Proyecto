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
            $post = Post::select(['id','title','description'])->get();
            return response()->json([$post]);
        }
        catch(Exception $e)
        {
            Log::info($e);
            return response()->json([null, 500]);
        }
    }

    public function store(Request $request)
    {
        try
        {
            $this->validate($request, [
                'user_id' => 'required',
                'title' => 'required | max:255',
                'description' => 'required', 
            ]);
            $post = Post::create($request->all());
            return response()->json($post, 201);
        }
        catch(Exception $e)
        {
            Log::info($e);
            return response()->json([null, 500]);
        }
    }

    public function show(Post $post)
    {
        try
        {
            return response()->json([$post]);
        }
        catch(\Exception $e)
        {
            Log::info($e);
            return response()->json([null, 500]);
        }
    }

    public function update(Request $request, Post $post)
    {   
        try
        {
            $this->validate($request, [
                'user_id' => 'required',
                'title' => 'required | max:255',
                'description' => 'required', 
            ]);
            $post->update($request->all());
            return response()->json($post, 200);
        }
        catch(Exception $e)
        {
            Log::info($e);
            return response()->json([null, 500]);
        }
    }

    public function destroy(Post $post)
    {
        try
        {
            $post->delete();
            return response()->json(null, 204);
        }
        catch(Exception $e)
        {
            Log::info($e);
            return response()->json([null, 500]);
        }
    }

}
