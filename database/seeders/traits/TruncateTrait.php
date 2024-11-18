<?php

namespace Database\Seeders\traits;

use Illuminate\Support\Facades\DB;

trait TruncateTrait
{
    /**
     * Empty the table after every time we seed the database 
     * If not emptied, fake values get stacked.
     * Must disable FOREIGN_KEY_CHECKS before, if not error.  
     * 
     * @params string
     */
    public function TruncateTable(string $model): void
    {
        DB::statement("SET FOREIGN_KEY_CHECKS = 0");

        $model::truncate();

        DB::statement("SET FOREIGN_KEY_CHECKS = 1");
    }
}
