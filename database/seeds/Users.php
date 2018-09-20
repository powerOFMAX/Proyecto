<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\User;


class Users extends Seeder
{

    public function run()
    {

        $faker=Faker::create();
            \DB::table('users')->insert(array(
                'name' => $faker-> name(),
                'email' => $faker-> email(),
                'password' => bcrypt($faker-> userName()),
                'rol' => 'user',
                'created_at' => $faker-> date('Y-m-d H:m:s'),
                'updated_at' => $faker-> date('Y-m-d H:m:s')
            ));

    //Creo User-RolAdmin  saveMany -- save
       factory(User::class)->create()->each(function($user){
        $user->posts()->saveMany(factory(App\Models\Post::class, 10)->make());
        });

        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt("1234"),
            'rol' => 'admin',
        ]);

    }

}
