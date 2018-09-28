<?php

namespace Tests\Browser;

use App\Models\Post;
use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

use Tests\Browser\Pages\Login;
use Tests\Browser\Pages\CreatePost;
use Tests\Browser\Pages\Home;
use Tests\Browser\Pages\EditPost;

use Tests\Browser\Components\CompleteForm;

class LoginTest extends DuskTestCase
{
    public function testExample()
    {
        $this->browse(function (Browser $browser) {
            $browser
        //Go to the login View
                ->visit(new Login)
                    ->within(new CompleteForm, function ($browser) {
                        $browser->fillForm('email','admin@admin.com','password', '1234');
                    })
                ->press('Login in')
        //Wait for home & Create a new Post
                ->waitForLocation('/')
                ->on(new Home)
                    ->newPost()
                ->on(new CreatePost)
                    ->within(new CompleteForm, function ($browser) {
                        $browser->fillForm('title','Im a new TEST post','description','Soy la descripcion del test');
                    })
                ->press('Submit')
        //Wait data & Post Edit
                ->waitUntil('window.store.getState().app.content.length>0',15);
            $post = Post::where(['title' => 'Im a new TEST post'])->first()->id;
            $browser
            ->on(new Home)
            ->editPost($post)
            ->on (new EditPost($post))
            ->within(new CompleteForm, function ($browser) {
                $browser->fillForm('title','Modifico el post del test','description', 'descripcion Modificada');
            })
            ->press('Submit')
        //Wait Home & Delete
            ->waitForLocation('/')
            ->on(new Home)
            ->deletePost($post);
        });
        
    }
}