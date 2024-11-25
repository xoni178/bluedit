<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;

class ModelService
{

    public function getEntity(string $model, string $primaryKey): Model
    {

        $entity = $model::findOrFail($primaryKey);

        return $entity;
    }
}
