<?php

use Faker\Generator as Faker;

$factory->define(App\Models\User::class, function (Faker $faker) {
    return [
        'name' => $faker-> name(),
        'email' => $faker-> email(),
        'password' => $faker-> userName(),
        'rol' => 'user',
        'created_at' => $faker-> date('Y-m-d H:m:s'),
        'updated_at' => $faker-> date('Y-m-d H:m:s')
    ];
});
