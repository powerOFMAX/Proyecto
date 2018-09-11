<?php

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        
       //Creo User-RolAdmin  saveMany -- save
       factory(User::class)->create()->each(function($user){
           $user->posts()->saveMany(factory(App\Models\Post::class, 10)->make());
        });
        //Creo un User normal
        $this->call(Users::class);

    }
}
