<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page;
use Tests\Browser\Components\SimpleForm;

class CreatePost extends Page
{
    protected $title;
    protected $description;
    
    /**
     * Get the URL for the page.
     *
     * @return string
     */
    public function url()
    {
        return '/new';
    }

    /**
     * Assert that the browser is on the page.
     *
     * @param  Browser  $browser
     * @return void
     */
    public function newPost(Browser $browser, $title, $description)
    {
        $this->title = $title;
        $this->description = $description;

        $browser->with(new SimpleForm, function ($create) {
            $value= [
                'title' => $this->title,
                'description' => $this->description
            ];
            $create->fillForm('form',$value);
        })
        ->press('Submit');
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
