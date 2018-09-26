<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class LoginTest extends DuskTestCase
{

    public function testExample()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                //Hago click en Login
                    ->assertSee('Login In')
                    ->clickLink('Login In')
                //Verifico que estoy ahi
                    ->assertSee('Password')
                    ->type('email', 'admin@admin.com')
                    ->type('password', '1234')
                    ->click('.btn-success')
                    ->assertSee('Email')
                //Espero a que me redireccione al home
                    ->waitFor('.badge-danger')
                //Clickeo en crear y creo el post
                    ->clickLink('Create')
                    ->assertSee("Creando un nuevo post")
                    ->type('title','Hola Soy un post Creado por el test')
                    ->type('description', 'soy la descripcion del test')
                    ->click('.btn-success')
                //Espero a que me redireccione al home
                    ->waitFor('.badge-danger')
                //Hago un edit talvez explota porq hace un get consultando el id
                    ->clickLink('Edit')
                    ->assertSee('Editando post numero')
                    ->type('title', 'Soy un post del test modificado')
                    ->type('description', 'Soy la descripcion modificada :DD por el test')
                    ->click('.btn-success')
                //Vuelvo al home y lo elimino
                    ->waitFor('.badge-danger')
                    ->click('.badge-danger')
                    ->acceptDialog();
        });
    }
}
