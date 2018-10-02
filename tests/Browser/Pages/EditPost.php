<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page;
use Tests\Browser\Components\SimpleForm;

class EditPost extends Page
{ 

    protected $id;
    protected $title;
    protected $description;

    public function __construct($param) {
        $this->id = $param;
    }
    
    /**
     * Get the URL for the page.
     *
     * @return string
     */
    
    public function url()
    {   
        return '/edit/'.$this->id;
    }

    public function makeEdit(Browser $browser, $title, $description)
    {
        $this->title = $title;
        $this->description = $description;

        $browser->within(new SimpleForm, function ($edit) {
            $value = [
                'title' => $this->title,
                'description' => $this->description
            ];
            $edit->fillForm('form', $value);
        })
        ->press('Submit');
    } 
    /**
     * Assert that the browser is on the page.
     *
     * @param  Browser  $browser
     * @return void
     */

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
