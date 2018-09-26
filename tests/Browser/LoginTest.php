<?php

namespace Tests\Browser;

use App\Models\Post;
use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class LoginTest extends DuskTestCase
{

    public function testExample()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                    ->assertPathIs('/')
                    ->assertSee('MyBlog')
                    ->clickLink('Login In')
                //Go to the login View
                    ->assertPathIs('/login')
                    ->type('email', 'admin@admin.com')
                    ->type('password', '1234')
                    ->press('Login in')
                //Wait for home & Create a new Post
                    ->waitForLocation('/')
                    ->clickLink('Create')
                    ->assertSee("Creando un nuevo post")
                    ->type('title','Hola Soy un post Creado por el test')
                    ->type('description', 'soy la descripcion del test')
                    ->press('Submit')
                //Wait data & Post Edit
                    ->waitUntil('window.store.getState().app.content.length>0',15)
                    ->clickLink('Edit')
                    ->assertSee('Editando post numero')
                    ->type('title', 'Soy un post del test modificado')
                    ->type('description', 'Soy la descripcion modificada :DD por el test')
                    ->press('Submit')
                //Wait Home & Delete
                    ->waitForLocation('/')
                    ->waitUntil('window.store.getState().app.content.length>0',15);
                     $post = Post::where(['title' => 'Soy un post del test modificado'])->first()->id;
                     $browser->press('@delete-'.$post)->acceptDialog();
            });
    }
}
