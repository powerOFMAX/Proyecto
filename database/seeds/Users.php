<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class Users extends Seeder
{

    public function run()
    {
        $faker=Faker::create();
            \DB::table('users')->insert(array(
                'name' => $faker-> name(),
                'email' => $faker-> email(),
                'password' => $faker-> userName(),
                'rol' => 'user',
                'created_at' => $faker-> date('Y-m-d H:m:s'),
                'updated_at' => $faker-> date('Y-m-d H:m:s')
            ));
    }

}
