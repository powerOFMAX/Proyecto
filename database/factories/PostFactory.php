<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Post::class, function (Faker $faker) {
    return [
        'title' => $faker -> text($maxNbChars = 100),
        'description' => $faker -> text($maxNbChars = 200),
        'created_at' => $faker-> date('Y-m-d H:m:s'),
        'updated_at' => $faker-> date('Y-m-d H:m:s'),
    ];
});
