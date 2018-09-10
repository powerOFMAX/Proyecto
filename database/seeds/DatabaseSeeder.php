<?php

use Illuminate\Database\Seeder;
use App\Models\Post;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        factory(Post::class, 10)->create();
       // factory(User::class, 1)->create();
        //factory('UserFactory',1)->create();
       // factory(UserFactory::class,10)->create(); 
        //$this->call(UsersTableSeeder::class);
       
        //Con seeders
        // $this->call(Users::class);
        // $this->call(Posts::class);


    }
}
