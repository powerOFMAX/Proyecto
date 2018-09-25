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
            /*Probe cambiando el link por un boton con el nombre pero tampoco
            Pero si funciona con por ejemplo unicamente 
                ->visit('/')
                ->assertSee('Login In');
            */
            
            $browser->visit('/')
                    ->assertSee('Login In')
                    ->press('Login in')
                    ->assertSee('Password');
        });
    }
}
