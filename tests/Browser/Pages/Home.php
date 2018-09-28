<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page;

class Home extends Page
{
    /**
     * Get the URL for the page.
     *
     * @return string
     */
    public function url()
    {
        return '/';
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

    public function newPost(Browser $browser)
    {
        $browser->clickLink('Create');
    }

    public function editPost(Browser $browser, $id)
    {
        $browser->press('@edit-'.$id);
    }

    public function deletePost(Browser $browser, $id)
    {
        $browser->press('@delete-'.$id)->acceptDialog();
    }

    public function elements()
    {
        return [
            '@element' => '#selector',
        ];
    }
}
