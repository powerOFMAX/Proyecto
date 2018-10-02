<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page;
use Tests\Browser\Components\SimpleForm;
use Tests\Browser\Components\LoginForm;

class Login extends Page
{

    protected $email;
    protected $password;

    /**
     * Get the URL for the page.
     *
     * @return string
     */
    public function url()
    {
        return '/login';
    }

    /**
     * Assert that the browser is on the page.
     *
     * @param  Browser  $browser
     * @return void
     */
    public function loginIn(Browser $browser, $email, $password )
    {
        $this->email = $email;
        $this->password = $password;
        
        $browser->with(new SimpleForm, function ($login) {
            $value= [
                'email' => $this->email,
                'password' => $this->password
            ];
            $login->fillForm('form', $value);
        })
        ->press('Login in');
    }

    public function logout()
    {
        $browser->assertSee('Logout')->clickLink('Logout');
    }

    public function assert(Browser $browser)
    {
        $browser->assertPathIs($this->url());
    }

    /**
     * Get the element shortcuts for the page.
     *
     * @return array
     */
    public function elements()
    {
        return [
            '@element' => '#selector',
        ];
    }
}
