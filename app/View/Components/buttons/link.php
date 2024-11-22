<?php

namespace App\View\Components\buttons;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class link extends Component
{
    public $isHome;
    public $type;

    /**
     * Create a new component instance.
     */
    public function __construct($isHome = true, $type = 'default')
    {
        $this->isHome = $isHome;
        $this->type = $type;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.buttons.link');
    }
}
