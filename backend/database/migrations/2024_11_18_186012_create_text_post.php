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
        Schema::create("text_post", function (Blueprint $table) {
            $table->id();
            $table->foreignId("post_id");
            $table->foreign("post_id")->on("posts")->references("id");
            $table->text("body");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("text_post");
    }
};
