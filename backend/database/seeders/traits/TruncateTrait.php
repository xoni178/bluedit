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
     * @param string
     */
    public function TruncateTable(string $model): void
    {
        DB::statement("SET FOREIGN_KEY_CHECKS = 0");

        $model::truncate();

        DB::statement("SET FOREIGN_KEY_CHECKS = 1");
    }

    /**
     * Empty pivot table after every time we seed the database 
     * If not emptied, fake values get stacked.
     * Must disable FOREIGN_KEY_CHECKS before, if not error.  
     * 
     * @param string
     */
    public function TruncatePivotTable(string $tableName): void
    {
        DB::statement("SET FOREIGN_KEY_CHECKS = 0");

        DB::statement("TRUNCATE TABLE " . $tableName);

        DB::statement("SET FOREIGN_KEY_CHECKS = 1");
    }
}
