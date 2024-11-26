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
        Schema::create('post_votes', function (Blueprint $table) {
            $table->id();
            $table->string("username");
            $table->foreign("username")->references("username")->on("users")->onDelete("Cascade");
            $table->foreignId("post_id");
            $table->foreign("post_id")->references("id")->on("posts")->onDelete("Cascade");
            $table->enum("vote_type", ["UPVOTE", "DOWNVOTE"]);
            $table->timestamps();
            $table->unique(['username', 'post_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_votes');
    }
};
