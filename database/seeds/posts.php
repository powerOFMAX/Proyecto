<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class posts extends Seeder
{

    public function run()
    {
        $faker=Faker::create();

        for ($i = 0; $i < 10; $i++){
            \DB::table('posts')-> insert(array(
                'title' => $faker -> text($maxNbChars = 100),
                'description' => $faker -> text($maxNbChars = 200),
                'created_at' => $faker-> date('Y-m-d H:m:s'),
                'updated_at' => $faker-> date('Y-m-d H:m:s')
            ));
        }
    }
}
