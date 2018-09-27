<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page;

class EditPost extends Page
{ 

    /**
     * Get the URL for the page.
     *
     * @return string
     */
    public function url($id)
    {
        return '/edit/'.$id;
    }

    /**
     * Assert that the browser is on the page.
     *
     * @param  Browser  $browser
     * @return void
     */
    public function assert(Browser $browser,$id)
    {
        $browser->assertPathIs($this->url($id));
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
