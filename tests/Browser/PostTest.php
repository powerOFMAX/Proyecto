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

use Tests\Browser\Components\CompleteForm;

class PostTest extends DuskTestCase
{
    
    public $post;
    public $title;
    public $description;

    public function testLogin()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit(new Login)
                ->within(new CompleteForm, function ($browser) {
                $browser->fillForm('email','admin@admin.com','password', '1234');
                })
                ->press('Login in');
        });
    }

    public function testCreate()
    {
        $faker=Faker::create();
        $this->title = $faker->title();
        $this->description = $faker->text();
        
        $this->browse(function (Browser $browser) {
            $browser->waitForLocation('/')
                ->on(new Home)
                    ->newPost()
                ->on(new CreatePost)
                    ->within(new CompleteForm, function ($browser) {
                        $browser->fillForm('title','Im a new TEST post','description',$this->description);
                    })
                ->press('Submit');
        });
    }

    public function testEdit()
    {
        $this->post = Post::where(['title' => 'Im a new TEST post'])->first()->id;
        $this->browse(function (Browser $browser) {
            $browser->waitUntil('window.store.getState().app.content.length>0',15);
            $browser
            ->on(new Home)
            ->editPost($this->post)
            ->on (new EditPost($this->post))
                ->within(new CompleteForm, function ($browser) {
                    $browser->fillForm('title','Modifico el post del test','description', 'descripcion Modificada');
                })
            ->press('Submit');
        });
    }   

    public function testDelete()
    {
        $this->browse(function (Browser $browser) {
            $browser->waitForLocation('/')
            ->on(new Home);
            $this->post = Post::where(['title' => 'Modifico el post del test'])->first()->id;
            $browser->deletePost($this->post);
        });
    }

    public function testLogout()
    {
        $this->browse(function (Browser $browser) {
            $browser->assertSee('Logout')->clickLink('Logout');
        });
    }
}