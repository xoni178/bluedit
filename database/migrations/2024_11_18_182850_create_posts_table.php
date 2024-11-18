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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId("username");
            $table->foreign("username")->on("users")->references("username");
            $table->foreignId("post_type");
            $table->foreign("post_type")->on("post_types")->references("id");
            $table->foreignId("community_name");
            $table->foreign("community_name")->on("communities")->references("name");
            $table->string("title", 255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
