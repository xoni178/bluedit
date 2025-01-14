<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('community_user', function (Blueprint $table) {
            $table->id();
            $table->string("username");
            $table->foreign("username")->references("username")->on("users")->onDelete("Cascade");
            $table->string("community_name");
            $table->foreign("community_name")->references("name")->on("communities")->onDelete("Cascade");
            $table->unique(['username', 'community_name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('community_user');
    }
};
