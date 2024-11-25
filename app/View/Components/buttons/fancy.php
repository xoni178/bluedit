<?php

namespace App\View\Components\buttons;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class fancy extends Component
{
    public string $link;
    /**
     * Create a new component instance.
     */
    public function __construct(string $link = '')
    {
        $this->link = $link;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.buttons.fancy');
    }
}
