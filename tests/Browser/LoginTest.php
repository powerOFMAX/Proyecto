<?php

namespace Tests\Browser;

use App\Models\Post;
use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

use Tests\Browser\Pages\Login;
use Tests\Browser\Pages\CreatePost;
use Tests\Browser\Pages\EditPost;
use Tests\Browser\Pages\Home;

use Tests\Browser\Components\CompleteForm;

class LoginTest extends DuskTestCase
{
    public function testExample()
    {
        /* Utilizo un completador de Forms Generico / Se frena en el edit por lo explicado debajo sin embargo la logica que utilizaria seria la escrita */
        $this->browse(function (Browser $browser) {
            $browser
                ->visit(new Login)
                    ->within(new CompleteForm, function ($browser) {
                        $browser->fillForm('email','admin@admin.com','password', '1234');
                    })
                ->press('Login in')
                ->waitForLocation('/')
                ->on(new Home)
                    ->newPost()
                ->on(new CreatePost)
                    ->within(new CompleteForm, function ($browser) {
                        $browser->fillForm('title','Im a new TEST post','description','Soy la descripcion del test');
                    })
                ->press('Submit')
                ->waitUntil('window.store.getState().app.content.length>0',15);
            $post = Post::where(['title' => 'Im a new TEST post'])->first()->id;
            $browser
                ->on(new Home)
                    ->editPost($post)
        //Actualmente nose como podria pasarle el id a la clase EditPost para que verifique la URL
                ->on (new EditPost($post))
                    ->within(new CompleteForm, function ($browser) {
                        $browser->fillForm('title','Modifico el post del test','description', 'descripcion Modificada');
                    })
                ->press('Submit')
                ->waitForLocation('/')
                ->on(new Home)
                    ->deletePost();
        });

        
/*         $this->browse(function (Browser $browser) {
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
            }); */
    
        
    }
}