<?php

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        //Creo un User normal
        $this->call(Users::class);

    }
}
