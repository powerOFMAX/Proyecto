<?php

namespace Tests\Browser;

use App\Models\Post;
use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Faker\Factory as Faker;

use Tests\Browser\Pages\Login;
use Tests\Browser\Pages\CreatePost;
use Tests\Browser\Pages\Home;
use Tests\Browser\Pages\EditPost;

class PostTest extends DuskTestCase
{
    public $post;
    public $title;
    public $description;

    /* 
        Login / Create / Edit / Delete 
    */
    public function testComplete()
    {
        $faker=Faker::create();
        $this->title = $faker->realText($faker->numberBetween(10,50));
        $this->description = $faker->text();

        $this->browse(function (Browser $browser) {
            //Login and Create a Post
            $browser->visit(new Login)->loginIn('admin@admin.com', '1234')
                    ->waitForLocation('/')
                    ->on(new Home)->newPost()
                    ->on(new CreatePost)->newPost($this->title, $this->description);
            $this->post = Post::where(['title' => $this->title])->first()->id;
            //Ask for the state content
            $browser->waitUntil('window.store.getState().app.content.length > 0', 15);
            //Edit and Delete a Post 
            $browser->on(new Home)->editPost($this->post)
                    ->on(new EditPost($this->post))
                        ->makeEdit('Modified '.$this->title, 'Modified '.$this->description)
                    ->waitForLocation('/')
                        ->on(new Home)->deletePost($this->post)
                    ->clickLink('Logout');
        });
    }
}